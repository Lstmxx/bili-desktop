import { getVideoPlayUrl } from '@/api/video';
import { VIDEO_QN_ENUM } from '@/constant/video';
import { type Video } from '../api/type';
import { DashSource } from '@/core/player/DashSource';

import { invoke } from '@tauri-apps/api/tauri';

// import { dashHttp } from '@/core/http';
import dashjs from 'dashjs';
// import { DOMAIN_ENUM } from '@/core/http/constant';
import { type Dash, type VideoDash } from '@/api/video/type';
import { dashHttp } from '@/core/http';

// import { fetch } from '@tauri-apps/api/http';
// import type { Dash, VideoDash } from '@/api/video/type';

const player = dashjs.MediaPlayer().create();

// player.extend(
//   'RequestModifier',
//   function () {
//     return {
//       async modifyRequest (request: Request) {
//         const res = await dashHttp.request({ url: request.url });
//         console.log('dash', res as any);

//         return {
//           ...res,
//           onProgress: function () {}
//         };
//       }
//     };
//   },
//   false
// );

class VideoPlayer {
  private readonly mediaSource: MediaSource;
  private videoSource: SourceBuffer | null;
  private dashData: Dash | null;
  private qnVideoData: VideoDash | null;

  private curRangeStart: number = 0;
  private totalRange: number = 0;

  private reqDuration: number = 0;

  constructor () {
    this.mediaSource = new MediaSource();
    this.videoSource = null;
    this.dashData = null;
    this.qnVideoData = null;
  }

  setQnVideo (qn: VIDEO_QN_ENUM) {
    const { video } = this.dashData!;
    const index = video.findIndex((item: any) => item.id === qn);
    this.qnVideoData = index === -1 ? video[0] : video[index];
  }

  initialize (dom: HTMLVideoElement, dash: Dash, qn: VIDEO_QN_ENUM) {
    dom.src = URL.createObjectURL(this.mediaSource);
    this.dashData = dash;
    this.setQnVideo(qn);
    this.mediaSource.addEventListener(
      'sourceopen',
      (e) => {
        try {
          this.videoSource = this.mediaSource.addSourceBuffer(this.qnVideoData!.mimeType);
          this.initVideoStream();
        } catch (error) {
          console.log('sourceopen error', error);
        }
      },
      false
    );
  }

  private getTotalRange (contentRange: string) {
    return [0, Number(contentRange.split('/')[1])];
  }

  async initVideoStream () {
    if (!this.qnVideoData) return;
    const { SegmentBase } = this.qnVideoData;
    const { Initialization } = SegmentBase;
    try {
      const curRangeStart = Initialization.split('-')[1];
      const res = await dashHttp.request({
        url: this.qnVideoData.baseUrl,
        headers: { range: 'bytes=0-' + curRangeStart }
      });

      console.log('header range', res.headers);
      const range = this.getTotalRange(res.headers['content-range']);
      this.videoSource?.appendBuffer(new Uint8Array(res.data as any));
      this.curRangeStart = Number(curRangeStart) + 1;
      this.totalRange = range[1];

      const duration = Math.floor((this.totalRange - this.curRangeStart) / 10);
      this.reqDuration = duration;

      const updateVideoSource = () => {
        this.getStart();
        this.videoSource?.removeEventListener('update', updateVideoSource);
      };
      this.videoSource?.addEventListener('update', updateVideoSource, false);
    } catch (error) {
      console.log('error');
    }
  }

  async getBuffer (range: string) {
    const res = await dashHttp.request({
      url: this.qnVideoData!.baseUrl,
      headers: { range }
    });
    console.log(range);
    return {
      range,
      buffer: new Uint8Array(res.data as any)
    };
  }

  async getStart () {
    const promiseList: Array<Promise<any>> = [];
    // 分10块

    console.log('duration', this.reqDuration);
    while (this.curRangeStart < this.totalRange) {
      const curEnd = this.curRangeStart + this.reqDuration;
      const range = `bytes=${this.curRangeStart}-${curEnd < this.totalRange ? curEnd : this.totalRange}`;
      console.log(range);
      promiseList.push(this.getBuffer(range));
      this.curRangeStart = curEnd + 1;
    }
    const dataList = await Promise.all(promiseList);
    console.log('dataList', dataList);
    dataList.forEach((data) => {
      const { buffer, range } = data;
      console.log(range);
      this.videoSource?.appendBuffer(buffer);
    });
    // promiseList.forEach(async (p) => {
    //   const data = await p();
    //
    // });
  }
}

const initVideoDom = () => {
  const dom = document.createElement('video');
  dom.autoplay = true;
  dom.className = 'w-full h-full absolute left-0 top-0 rounded-lg object-cover z-50';
  return dom;
};

const videoDom = initVideoDom();

// const preview = new VideoPreview();

const handleGetPreviewVideoUrl = async (video: Video) => {
  if (!video) return;
  const qn = VIDEO_QN_ENUM._480P;
  const { data } = await getVideoPlayUrl({
    bvid: video.bvid,
    avid: video.id,
    cid: video.cid,
    qn,
    fnval: 4048,
    fourk: 1,
    fnver: 0
  });
  console.log('playUrl:', data);
  const { dash } = data;
  if (videoDom && dash) {
    // const { video } = dash;
    // const index = video.findIndex((item: any) => item.id === qn);
    // const url = index === -1 ? video[0].baseUrl : video[index].baseUrl;
    // console.log('m4s url', url);
    const dashSource = new DashSource(data, qn);
    const mpd = dashSource.getMPD();
    const code = await invoke<string>('save_mpd', { mpd });
    console.log('code', code);
    const preview = new VideoPlayer();
    preview.initialize(videoDom, dash, qn);
    // player.initialize(videoDom, `${DOMAIN_ENUM.RUST_API}/mpd/${code}`, true);

    console.log('getDashAdapter', player.getDashAdapter().getMpd());
  }
};

let targetDom: HTMLDivElement | null = null;
export const showVideoPreview = ({ video, target }: { video: Video; target: HTMLDivElement; }) => {
  targetDom = target;
  targetDom.appendChild(videoDom);
  handleGetPreviewVideoUrl(video);
};

export const hiddenVideoPreview = () => {
  targetDom?.removeChild(videoDom);
  targetDom = null;
};
