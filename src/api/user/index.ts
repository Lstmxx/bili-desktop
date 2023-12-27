import http from '@/core/http';
import { DOMAIN_ENUM } from '@/core/http/constant';
import type * as Types from './type';

/**
 * 获取当前用户信息
 */
export const getSelfInfo = async () => {
  return await http.get<Types.IUserInfo>({
    server: DOMAIN_ENUM.BILI_API,
    url: '/x/space/myinfo',
    loading: true
  });
};

/**
 * 获取用户关系信息
 */
export const getRelationStat = async () => {
  return await http.get<Types.IGetRelationStatRes>({
    server: DOMAIN_ENUM.BILI_API,
    url: '/x/web-interface/nav/stat'
  });
};
