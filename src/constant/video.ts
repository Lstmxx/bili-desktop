/**
 * 视频质量枚举
 */
export enum VIDEO_QN_ENUM {
  _240p = 6,
  _360P = 16,
  _480P = 32,
  _720P = 64,
  _1080P = 80,
  _1080P_PLUS = 112,
  _1080P_60 = 116,
  _4K = 120,
  HDR = 125,
  DOLBY = 126,
  _8K = 127,
}

export enum VIDEO_FNVAL_ENUM {
  MP4 = 1,
  DASH = 16,
  NEED_HDR = 64,
  NEED_4K = 128,
  NEED_DOLBY_AUDIO = 256,
  NEED_DOLBY_VISION = 512,
  NEED_8K = 1024,
  NEED_AV1 = 2048,
}

export enum VIDEO_CODECID_ENUM {
  AVC = 7,
  HEVC = 12,
  AV1 = 13,
}

export enum AUDIO_QN_ENUM {
  _64K = 30216,
  _132K = 30232,
  DOLBY = 30250,
  HI_RES = 30251,
  _192K = 30280,
}

export enum MIMEType {
  AudioMp4 = 'audio/mp4',
  VideoMp4 = 'video/mp4',
}

export enum Sar {
  Empty = '',
  The11 = '1:1',
  The640639 = '640:639',
}
