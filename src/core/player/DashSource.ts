/* eslint-disable max-len */
import type { Dash, IPlayUrlRes, Audio, VideoDash } from '@/api/video/type';
import { type VIDEO_QN_ENUM } from '@/constant/video';

export interface SupportFormat {
  quality: VIDEO_QN_ENUM;
  format: string;
  newDescription: string;
  displayDesc: string;
  superscript: string;
  description: string;
  needLogin: number;
  needVip: number;
  codecs: string[];
}

export interface MediaDataSource {
  type: 'dash' | 'flv' | 'mp4';
  duration: number;
  url: Dash | string;
}

export class DashSource {
  private readonly dashData: Dash | undefined;
  private readonly qn: VIDEO_QN_ENUM;
  private readonly playUrlResult: IPlayUrlRes;
  private parsedManifest: any = {};
  constructor (playUrlResult: IPlayUrlRes, qn: VIDEO_QN_ENUM) {
    this.playUrlResult = playUrlResult;
    if (playUrlResult.dash) {
      this.dashData = playUrlResult.dash;
    }
    this.qn = qn;
    this.parsedManifest = this.parseManifest();
  }

  getVideo () {
    if (!this.dashData) return null;
    const { video } = this.dashData;
    if (Array.isArray(video) && video.length > 0) {
      const index = video.findIndex((item: any) => item.id === this.qn);
      const item = index === -1 ? video[0] : video[index];
      return item;
    }
    return null;
  }

  getAudio () {
    if (!this.dashData) return null;
    const { audio } = this.dashData;
    if (Array.isArray(audio) && audio.length > 0) {
      return audio[0];
    }
    return null;
  }

  private replaceUrlProtocol<T>(dash: T) {
    return Array.isArray(dash)
      ? dash.map((item) => {
        item.base_url && (item.baseUrl = item.base_url.replace(/http:\/\//g, 'https://'));
        item.backup_url &&
            (item.backupUrl = item.backup_url.map((url: string) => url.replace(/http:\/\//g, 'https://')));
        return {
          ...item
        };
      })
      : dash;
  }

  private parsePlayUrlRes () {
    const mediaDataSource: MediaDataSource = {
      type: 'dash',
      url: '',
      duration: 0
    };
    const {
      accept_quality = [2],
      accept_description,
      format,
      timelength,
      quality,
      last_play_cid,
      last_play_time,
      support_formats
    } = this.playUrlResult;
    const protocol = 'https';
    mediaDataSource.duration = timelength;
    const dash = this.dashData!;
    dash.video = this.replaceUrlProtocol<VideoDash[]>(dash.video);
    dash.audio = this.replaceUrlProtocol<Audio[]>(dash.audio);
    mediaDataSource.url = dash;
    const supportFormats: SupportFormat[] = Array.isArray(support_formats)
      ? support_formats.map((item) => {
        return {
          displayDesc: item.display_desc,
          superscript: item.superscript,
          needLogin: item.need_login,
          format: item.format,
          description: item.description,
          needVip: item.need_vip,
          quality: item.quality,
          newDescription: item.new_description,
          codecs: item.codecs
        };
      })
      : [];
    const result = {
      error: null,
      raw: this.playUrlResult,
      body: {
        format,
        quality,
        timelength,
        streamType: protocol,
        acceptQuality: accept_quality,
        acceptDescription: accept_description,
        mediaDataSource,
        supportFormats,
        lastPlayCid: last_play_cid,
        lastPlayTime: last_play_time,
        // 这些值暂不知道干啥的
        clipInfoList: undefined,
        isPreview: undefined,
        abTestId: undefined,
        dmOffset: undefined,
        session: undefined,
        isDrm: undefined,
        drmTechType: undefined,
        recordInfo: undefined
      }
    };
    return result;
  }

  parseManifest () {
    if (!this.dashData) return null;
    this.parsedManifest = {};

    // const now = window.performance.now();
  }

  getMPD () {
    const video = this.getVideo();
    if (!video) return '';
    //     const mpd = `
    // <MPD xmlns="urn:mpeg:DASH:schema:MPD:2011" profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" type="static" mediaPresentationDuration="PT${
    //   this.dashData!.duration
    // }S" minBufferTime="PT${this.dashData!.min_buffer_time}S">
    //     <Period start="PT0S">
    //     <BaseURL>${video.baseUrl}</BaseURL>
    //         <AdaptationSet>
    //             <ContentComponent contentType="video" id="1" />
    //             <Representation bandwidth="${video.bandwidth}" codecs="${video.codecs}" height="${video.height}" id="${
    //   video.id
    // }" mimeType="${video.mime_type}" width="${video.width}">
    //                 <BaseURL></BaseURL>
    //                 <SegmentBase indexRange="${video.segment_base.index_range}">
    //                     <Initialization range="${video.segment_base.initialization}" />
    //                 </SegmentBase>
    //             </Representation>
    //         </AdaptationSet>
    //     </Period>
    // </MPD>`;
    const mpd = `
<?xml version="1.0" encoding="UTF-8"?>
<MPD xmlns="urn:mpeg:dash:schema:mpd:2011" profiles="urn:mpeg:dash:profile:isoff-on-demand:2011" type="static" mediaPresentationDuration="PT628S" minBufferTime="PT1.500000S">
  <Period>
    <AdaptationSet mimeType="video/mp4" startWithSAP="1" scanType="progressive" segmentAlignment="true">
      <Representation bandwidth="9663638" codecs="hev1.1.6.L153.90" frameRate="62.500" height="2160" id="120" width="3840">
        <BaseURL>https://xy110x181x13x254xy.mcdn.bilivideo.cn:8082/v1/resource/1407415093-1-100145.m4s?agrr=1&build=0&buvid=B27F958A-F71A-85B7-2C1C-721F18A701C297888infoc&bvc=vod&bw=1209526&cdnid=61323&deadline=1705394227&e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M%3D&f=u_0_0&gen=playurlv2&logo=80000000&mid=628263&nbs=1&nettype=0&oi=3070634951&orderid=0,C3&os=bcache&platform=pc&sign=c07f02&traceid=trmGMiQNOAcNCj_0_e_N&uipk=5&uparams=e,Cuipk,Cnbs,Cdeadline,Cgen,Cos,Coi,Ctrid,Cmid,Cplatform&upsig=8f165c57714e462e28e5d925ab5def76</BaseURL>
        <SegmentBase indexRange="1072-2615">
          <Initialization range="0-1071"></Initialization>
        </SegmentBase>
      </Representation>
      <Representation bandwidth="13212115" codecs="avc1.640034" frameRate="58.824" height="2160" id="120" width="3840">
        <BaseURL>https://xy110x181x14x29xy.mcdn.bilivideo.cn:8082/v1/resource/1407415093-1-30120.m4s?agrr=1&build=0&buvid=B27F958A-F71A-85B7-2C1C-721F18A701C297888infoc&bvc=vod&bw=1653618&cdnid=61323&deadline=1705394227&e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M%3D&f=u_0_0&gen=playurlv2&logo=80000000&mid=628263&nbs=1&nettype=0&oi=3070634951&orderid=0,C3&os=bcache&platform=pc&sign=7ca0bf&traceid=trOIGGVTxWyVtv_0_e_N&uipk=5&uparams=e,Cuipk,Cnbs,Cdeadline,Cgen,Cos,Coi,Ctrid,Cmid,Cplatform&upsig=d74927ac5771310ec85c63f726f153c3</BaseURL>
        <SegmentBase indexRange="1004-2547">
          <Initialization range="0-1003"></Initialization>
        </SegmentBase>
      </Representation>
      <Representation bandwidth="2952444" codecs="hev1.1.6.L150.90" frameRate="58.824" height="1080" id="116" width="1920">
        <BaseURL>https://xy111x226x46x190xy.mcdn.bilivideo.cn:8082/v1/resource/1407415093-1-100144.m4s?agrr=1&build=0&buvid=B27F958A-F71A-85B7-2C1C-721F18A701C297888infoc&bvc=vod&bw=369535&cdnid=61323&deadline=1705394227&e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M%3D&f=u_0_0&gen=playurlv2&logo=80000000&mid=628263&nbs=1&nettype=0&oi=3070634951&orderid=0,C3&os=bcache&platform=pc&sign=34c3fe&traceid=trgokbhZgICUmc_0_e_N&uipk=5&uparams=e,Cuipk,Cnbs,Cdeadline,Cgen,Cos,Coi,Ctrid,Cmid,Cplatform&upsig=c1f7daa3b1939c21417df0c29b3c1d38</BaseURL>
        <SegmentBase indexRange="1073-2616">
          <Initialization range="0-1072"></Initialization>
        </SegmentBase>
      </Representation>
      <Representation bandwidth="4462686" codecs="avc1.640032" frameRate="58.824" height="1080" id="116" width="1920">
        <BaseURL>https://xy124x239x108x37xy.mcdn.bilivideo.cn:8082/v1/resource/1407415093-1-30116.m4s?agrr=1&build=0&buvid=B27F958A-F71A-85B7-2C1C-721F18A701C297888infoc&bvc=vod&bw=558547&cdnid=61323&deadline=1705394227&e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M%3D&f=u_0_0&gen=playurlv2&logo=80000000&mid=628263&nbs=1&nettype=0&oi=3070634951&orderid=0,C3&os=bcache&platform=pc&sign=8a1162&traceid=treCLbWnLyMkhM_0_e_N&uipk=5&uparams=e,Cuipk,Cnbs,Cdeadline,Cgen,Cos,Coi,Ctrid,Cmid,Cplatform&upsig=83e1c51aff62cae1e066a8ea97b7bb5f</BaseURL>
        <SegmentBase indexRange="1009-2552">
          <Initialization range="0-1008"></Initialization>
        </SegmentBase>
      </Representation>
      <Representation bandwidth="1448442" codecs="hev1.1.6.L150.90" frameRate="30.303" height="1080" id="80" width="1920">
        <BaseURL>https://xy124x239x110x104xy.mcdn.bilivideo.cn:8082/v1/resource/1407415093-1-100113.m4s?agrr=1&build=0&buvid=B27F958A-F71A-85B7-2C1C-721F18A701C297888infoc&bvc=vod&bw=181285&cdnid=61323&deadline=1705394227&e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M%3D&f=u_0_0&gen=playurlv2&logo=80000000&mid=628263&nbs=1&nettype=0&oi=3070634951&orderid=0,C3&os=bcache&platform=pc&sign=b175f1&traceid=trCpLpsuysiJPd_0_e_N&uipk=5&uparams=e,Cuipk,Cnbs,Cdeadline,Cgen,Cos,Coi,Ctrid,Cmid,Cplatform&upsig=ba512576a5de81bd96532a5f1b392041</BaseURL>
        <SegmentBase indexRange="1073-2616">
          <Initialization range="0-1072"></Initialization>
        </SegmentBase>
      </Representation>
      <Representation bandwidth="2329959" codecs="avc1.640032" frameRate="30.303" height="1080" id="80" width="1920">
        <BaseURL>https://xy106x45x15x130xy.mcdn.bilivideo.cn:8082/v1/resource/1407415093-1-30080.m4s?agrr=1&build=0&buvid=B27F958A-F71A-85B7-2C1C-721F18A701C297888infoc&bvc=vod&bw=291616&cdnid=61323&deadline=1705394227&e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M%3D&f=u_0_0&gen=playurlv2&logo=80000000&mid=628263&nbs=1&nettype=0&oi=3070634951&orderid=0,C3&os=bcache&platform=pc&sign=2a3c1f&traceid=trtKndxQSzWoPw_0_e_N&uipk=5&uparams=e,Cuipk,Cnbs,Cdeadline,Cgen,Cos,Coi,Ctrid,Cmid,Cplatform&upsig=8fee0113d41d636c875a705b4991e47e</BaseURL>
        <SegmentBase indexRange="1009-2552">
          <Initialization range="0-1008"></Initialization>
        </SegmentBase>
      </Representation>
      <Representation bandwidth="818440" codecs="hev1.1.6.L120.90" frameRate="30.303" height="720" id="64" width="1280">
        <BaseURL>https://xy113x141x48x231xy.mcdn.bilivideo.cn:8082/v1/resource/1407415093-1-100111.m4s?agrr=1&build=0&buvid=B27F958A-F71A-85B7-2C1C-721F18A701C297888infoc&bvc=vod&bw=102435&cdnid=61323&deadline=1705394227&e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M%3D&f=u_0_0&gen=playurlv2&logo=80000000&mid=628263&nbs=1&nettype=0&oi=3070634951&orderid=0,C3&os=bcache&platform=pc&sign=5fc0ac&traceid=trqmDDWggSLiZU_0_e_N&uipk=5&uparams=e,Cuipk,Cnbs,Cdeadline,Cgen,Cos,Coi,Ctrid,Cmid,Cplatform&upsig=140cd08efb1b74c3fea2fe3b82ac42e8</BaseURL>
        <SegmentBase indexRange="1073-2616">
          <Initialization range="0-1072"></Initialization>
        </SegmentBase>
      </Representation>
      <Representation bandwidth="1498718" codecs="avc1.640028" frameRate="30.303" height="720" id="64" width="1280">
        <BaseURL>https://xy111x112x96x158xy.mcdn.bilivideo.cn:8082/v1/resource/1407415093-1-30064.m4s?agrr=1&build=0&buvid=B27F958A-F71A-85B7-2C1C-721F18A701C297888infoc&bvc=vod&bw=187578&cdnid=61323&deadline=1705394227&e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M%3D&f=u_0_0&gen=playurlv2&logo=80000000&mid=628263&nbs=1&nettype=0&oi=3070634951&orderid=0,C3&os=bcache&platform=pc&sign=2009fc&traceid=trDRKlqmwQgqls_0_e_N&uipk=5&uparams=e,Cuipk,Cnbs,Cdeadline,Cgen,Cos,Coi,Ctrid,Cmid,Cplatform&upsig=d0c91198aa5bc3184cadd6a80b6f79ce</BaseURL>
        <SegmentBase indexRange="1009-2552">
          <Initialization range="0-1008"></Initialization>
        </SegmentBase>
      </Representation>
      <Representation bandwidth="461777" codecs="hev1.1.6.L120.90" frameRate="30.303" height="480" id="32" width="852">
        <BaseURL>https://xy111x113x192x169xy.mcdn.bilivideo.cn:8082/v1/resource/1407415093-1-100110.m4s?agrr=1&build=0&buvid=B27F958A-F71A-85B7-2C1C-721F18A701C297888infoc&bvc=vod&bw=57795&cdnid=61323&deadline=1705394227&e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M%3D&f=u_0_0&gen=playurlv2&logo=80000000&mid=628263&nbs=1&nettype=0&oi=3070634951&orderid=0,C3&os=bcache&platform=pc&sign=51dffc&traceid=trXHVxcAckiRFZ_0_e_N&uipk=5&uparams=e,Cuipk,Cnbs,Cdeadline,Cgen,Cos,Coi,Ctrid,Cmid,Cplatform&upsig=da88e8f92ac945e396ee3417b2bb109b</BaseURL>
        <SegmentBase indexRange="1077-2620">
          <Initialization range="0-1076"></Initialization>
        </SegmentBase>
      </Representation>
      <Representation bandwidth="691131" codecs="avc1.64001F" frameRate="30.303" height="480" id="32" width="852">
        <BaseURL>https://xy106x116x240x209xy.mcdn.bilivideo.cn:8082/v1/resource/1407415093-1-30032.m4s?agrr=1&build=0&buvid=B27F958A-F71A-85B7-2C1C-721F18A701C297888infoc&bvc=vod&bw=86501&cdnid=61323&deadline=1705394227&e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M%3D&f=u_0_0&gen=playurlv2&logo=80000000&mid=628263&nbs=1&nettype=0&oi=3070634951&orderid=0,C3&os=bcache&platform=pc&sign=af93cf&traceid=trjMMuzYZXrOFR_0_e_N&uipk=5&uparams=e,Cuipk,Cnbs,Cdeadline,Cgen,Cos,Coi,Ctrid,Cmid,Cplatform&upsig=847c18f98854fd3cce5720b2808b9a68</BaseURL>
        <SegmentBase indexRange="1012-2555">
          <Initialization range="0-1011"></Initialization>
        </SegmentBase>
      </Representation>
      <Representation bandwidth="257342" codecs="hev1.1.6.L120.90" frameRate="30.303" height="360" id="16" width="640">
        <BaseURL>https://cn-gddg-ct-01-23.bilivideo.com/upgcxcode/93/50/1407415093/1407415093-1-100109.m4s?e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M=&uipk=5&nbs=1&deadline=1705394227&gen=playurlv2&os=bcache&oi=3070634951&trid=0000f2334d4120f642ee8b11e067cf96e471u&mid=628263&platform=pc&upsig=87c7f84d7f93e6e42e37d6328f473179&uparams=e,uipk,nbs,deadline,gen,os,oi,trid,mid,platform&cdnid=61323&bvc=vod&nettype=0&orderid=0,3&buvid=B27F958A-F71A-85B7-2C1C-721F18A701C297888infoc&build=0&f=u_0_0&agrr=1&bw=32208&logo=80000000</BaseURL>
        <SegmentBase indexRange="1071-2614">
          <Initialization range="0-1070"></Initialization>
        </SegmentBase>
      </Representation>
      <Representation bandwidth="326436" codecs="avc1.64001E" frameRate="30.303" height="360" id="16" width="640">
        <BaseURL>https://xy171x8x173x201xy.mcdn.bilivideo.cn:8082/v1/resource/1407415093-1-30016.m4s?agrr=1&build=0&buvid=B27F958A-F71A-85B7-2C1C-721F18A701C297888infoc&bvc=vod&bw=40856&cdnid=61323&deadline=1705394227&e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M%3D&f=u_0_0&gen=playurlv2&logo=80000000&mid=628263&nbs=1&nettype=0&oi=3070634951&orderid=0,C3&os=bcache&platform=pc&sign=8b18e9&traceid=trMVDnxsmOxjvd_0_e_N&uipk=5&uparams=e,Cuipk,Cnbs,Cdeadline,Cgen,Cos,Coi,Ctrid,Cmid,Cplatform&upsig=9046988339f2a6121ffabff5bf6a293d</BaseURL>
        <SegmentBase indexRange="1015-2558">
          <Initialization range="0-1014"></Initialization>
        </SegmentBase>
      </Representation>
    </AdaptationSet>
    <AdaptationSet mimeType="audio/mp4" startWithSAP="1" segmentAlignment="true" lang="und">
      <Representation audioSamplingRate="44100" bandwidth="204918" codecs="mp4a.40.2" id="30280">
        <BaseURL>https://xy112x81x52x83xy.mcdn.bilivideo.cn:8082/v1/resource/1407415093-1-30280.m4s?agrr=1&build=0&buvid=B27F958A-F71A-85B7-2C1C-721F18A701C297888infoc&bvc=vod&bw=25651&cdnid=61323&deadline=1705394227&e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M%3D&f=u_0_0&gen=playurlv2&logo=80000000&mid=628263&nbs=1&nettype=0&oi=3070634951&orderid=0,C3&os=bcache&platform=pc&sign=55e45c&traceid=trMNFHodtBuyJh_0_e_N&uipk=5&uparams=e,Cuipk,Cnbs,Cdeadline,Cgen,Cos,Coi,Ctrid,Cmid,Cplatform&upsig=f935d386c1df22e6d2c615ad82eeb223</BaseURL>
        <SegmentBase indexRange="934-2477">
          <Initialization range="0-933"></Initialization>
        </SegmentBase>
      </Representation>
      <Representation audioSamplingRate="44100" bandwidth="45906" codecs="mp4a.40.5" id="30216">
        <BaseURL>https://xy106x45x14x221xy.mcdn.bilivideo.cn:8082/v1/resource/1407415093-1-30216.m4s?agrr=1&build=0&buvid=B27F958A-F71A-85B7-2C1C-721F18A701C297888infoc&bvc=vod&bw=5747&cdnid=61323&deadline=1705394227&e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M%3D&f=u_0_0&gen=playurlv2&logo=80000000&mid=628263&nbs=1&nettype=0&oi=3070634951&orderid=0,C3&os=bcache&platform=pc&sign=0374cd&traceid=tryDbKxnJUkcCx_0_e_N&uipk=5&uparams=e,Cuipk,Cnbs,Cdeadline,Cgen,Cos,Coi,Ctrid,Cmid,Cplatform&upsig=8a9eb3c7447909396fa99125ff6c1dcf</BaseURL>
        <SegmentBase indexRange="943-2486">
          <Initialization range="0-942"></Initialization>
        </SegmentBase>
      </Representation>
      <Representation audioSamplingRate="44100" bandwidth="107386" codecs="mp4a.40.2" id="30232">
        <BaseURL>https://xy180x213x170x249xy.mcdn.bilivideo.cn:8082/v1/resource/1407415093-1-30232.m4s?agrr=1&build=0&buvid=B27F958A-F71A-85B7-2C1C-721F18A701C297888infoc&bvc=vod&bw=13442&cdnid=61323&deadline=1705394227&e=ig8euxZM2rNcNbdlhoNvNC8BqJIzNbfqXBvEqxTEto8BTrNvN0GvT90W5JZMkX_YN0MvXg8gNEV4NC8xNEV4N03eN0B5tZlqNxTEto8BTrNvNeZVuJ10Kj_g2UB02J0mN0B5tZlqNCNEto8BTrNvNC7MTX502C8f2jmMQJ6mqF2fka1mqx6gqj0eN0B599M%3D&f=u_0_0&gen=playurlv2&logo=80000000&mid=628263&nbs=1&nettype=0&oi=3070634951&orderid=0,C3&os=bcache&platform=pc&sign=34e24c&traceid=trOdQrDsxKDbOW_0_e_N&uipk=5&uparams=e,Cuipk,Cnbs,Cdeadline,Cgen,Cos,Coi,Ctrid,Cmid,Cplatform&upsig=0ad45bf33858bffbc80d58aa8362b182</BaseURL>
        <SegmentBase indexRange="934-2477">
          <Initialization range="0-933"></Initialization>
        </SegmentBase>
      </Representation>
    </AdaptationSet>
  </Period>
</MPD>
    `;
    return mpd;
  }
}
