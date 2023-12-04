import http from '@/core/http';
import { DOMAIN_ENUM } from '@/core/http/constant';

/**
 * 获取当前用户信息
 */
export const getSelfInfo = async () => {
	return await http.get<any>({
		server: DOMAIN_ENUM.BILI_API,
		url: '/x/space/myinfo'
	});
};
