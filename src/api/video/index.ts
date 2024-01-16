import http from '@/core/http';
import { DOMAIN_ENUM } from '@/core/http/constant';
import type * as Types from './type';

/**
 * 获取当前当前视频流dash信息
 */
export const getVideoPlayUrl = async (params: Types.IPlayUrlParams) => {
  return await http.get<Types.IPlayUrlRes>({
    server: DOMAIN_ENUM.BILI_API,
    url: '/x/player/wbi/playurl',
    params,
    loading: false
  });
};
