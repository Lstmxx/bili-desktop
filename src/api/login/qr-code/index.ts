import http from '@/core/http';
import { DOMAIN_ENUM } from '@/core/http/constant';
import type * as Types from './type';

/**
 * 获取qrCode和token
 */
export const generateQrCode = async () => {
	return await http.get<Types.IGenerateQrCodeRes>({
		server: DOMAIN_ENUM.PASSPORT,
		url: '/x/passport-login/web/qrcode/generate?source=main-fe-header'
	});
};

/**
 * 获取客户端扫描状态
 */
export const qrCodePoll = async (params: Types.IQrCodePollParams) => {
	return await http.get<Types.IQrCodePollRes>({
		server: DOMAIN_ENUM.PASSPORT,
		url: '/x/passport-login/web/qrcode/poll',
		params
	});
};

/**
 * 获取 buvid3 / buvid4
 */
export const getSpi = async () => {
	return await http.get<Types.IGetSpiRes>({
		server: DOMAIN_ENUM.BILI_API,
		url: '/x/frontend/finger/spi'
	});
};
