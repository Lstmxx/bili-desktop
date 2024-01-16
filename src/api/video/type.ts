import { type YES_OR_NO_ENUM } from '@/constant/commond';
import type { AUDIO_QN_ENUM, MIMEType, Sar, VIDEO_QN_ENUM } from '@/constant/video';

export interface IPlayUrlParams {
  /**
   * avid 与 bvid 任选一个
   */
  avid: number;
  /**
   * avid 与 bvid 任选一个
   */
  bvid: string;
  cid: number;
  /**
   * 视频清晰度
   */
  qn?: VIDEO_QN_ENUM;
  /**
   * 二进制属性位，如需组合功能需要使用OR运算结合一下数值

      目前 FLV 格式已下线，应避免使用fnval=0
   */
  fnval?: number;
  /**
   * 视频流版本标识
   */
  fnver?: number;
  /**
   * 是否允许 4K 视频
   * 画质最高 1080P：0（默认）
     画质最高 4K：1
   */
  fourk?: YES_OR_NO_ENUM;
  /**
   * pc：web播放（默认值，视频流存在 referer鉴权）
html5：移动端 HTML5 播放（仅支持 MP4 格式，无 referer 鉴权可以直接使用video标签播放）
   */
  platform?: 'pc' | 'html5';
}

export interface IPlayUrlRes {
  from: string;
  result: string;
  message: string;
  quality: VIDEO_QN_ENUM;
  format: string;
  /**
   * 视频长度
   */
  timelength: number;
  /**
   * 支持的全部格式
   * 每项用,分隔
   */
  accept_format: string;
  /**
   * 对应accept_quality的中文描述
   */
  accept_description: string[];
  accept_quality: VIDEO_QN_ENUM[];
  video_codecid: number;
  seek_param: string;
  seek_type: string;
  dash: Dash;
  support_formats: SupportFormat[];
  high_format: null;
  last_play_time: number;
  last_play_cid: number;
}

export interface Dash {
  duration: number;
  minBufferTime: number;
  min_buffer_time: number;
  video: VideoDash[];
  audio: Audio[];
  dolby: Dolby;
  flac: null;
}

export interface VideoDash {
  id: VIDEO_QN_ENUM;
  baseUrl: string;
  base_url: string;
  backupUrl: string[];
  backup_url: string[];
  bandwidth: number;
  mimeType: string;
  mime_type: string;
  codecs: string;
  width: number;
  height: number;
  frameRate: string;
  frame_rate: string;
  sar: Sar;
  startWithSap: number;
  start_with_sap: number;
  SegmentBase: SegmentBase;
  segment_base: SegmentBaseClass;
  codecid: number;
}

export interface Audio {
  id: AUDIO_QN_ENUM;
  baseUrl: string;
  base_url: string;
  backupUrl: string[];
  backup_url: string[];
  bandwidth: number;
  mimeType: MIMEType;
  codecs: string;
  SegmentBase: SegmentBase;
  segment_base: SegmentBaseClass;
  codecid: number;
}

export interface SegmentBase {
  Initialization: string;
  indexRange: string;
}

export interface SegmentBaseClass {
  initialization: string;
  index_range: string;
}

export interface Dolby {
  type: number;
  audio: null;
}

export interface SupportFormat {
  quality: VIDEO_QN_ENUM;
  format: string;
  new_description: string;
  display_desc: string;
  superscript: string;
  description: string;
  need_login: number;
  need_vip: number;
  codecs: string[];
}
