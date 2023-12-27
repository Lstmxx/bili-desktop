import http from '@/core/http';
import { DOMAIN_ENUM } from '@/core/http/constant';
import type * as Types from './type';

/**
 * 获取推荐视频
 */
export const getRecommendVideos = async (params: Types.IGetRecommendVideos) => {
  return await http.get<Types.IGetRecommendVideosRes>({
    server: DOMAIN_ENUM.BILI_API,
    url: '/x/web-interface/wbi/index/top/feed/rcmd',
    params
  });
};
