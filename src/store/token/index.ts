import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';
import qs from 'qs';
import { getSpi } from '@/api/login/qr-code';
import * as uuid from 'uuid';

interface Credential {
	SESSDATA: string;
	bili_jct: string;
	buvid3: string;
	// 用户id
	DedeUserID: string;
	ac_time_value: string;
}

interface TokenStore {
	credential: Credential;
	clearCredential: () => void;
	getCookies: () => string;
	setByQrCodeLoginRes: (url: string, refreshToken: string) => void;
}

export const useTokenStore = create<TokenStore>()(
	devtools(
		persist(
			(set, get) => ({
				credential: {
					SESSDATA: '',
					bili_jct: '',
					buvid3: '',
					DedeUserID: '',
					ac_time_value: ''
				},
				setByQrCodeLoginRes: async (url, refreshToken) => {
					const keys = ['SESSDATA', 'bili_jct', 'DedeUserID'];
					const params = qs.parse(url.split('?')[1]);
					const [SESSDATA, bili_jct, DedeUserID] = keys.map((key) => params[key] ?? '') as string[];
					let buvid3 = '';
					try {
						const { data } = await getSpi();
						buvid3 = data.b_3;
					} catch (error) {
						buvid3 = `${uuid.v1()}infoc`;
					}
					set(() => ({
						credential: {
							SESSDATA,
							bili_jct,
							DedeUserID,
							ac_time_value: refreshToken,
							buvid3
						}
					}));
				},
				clearCredential: () => {
					set({
						credential: {
							SESSDATA: '',
							bili_jct: '',
							buvid3: '',
							DedeUserID: '',
							ac_time_value: ''
						}
					});
				},
				getCookies: () => {
					const credential = get().credential;
					let cookies = '';
					Object.keys(credential).forEach((key) => {
						cookies += `${key}=${(credential as any)[key]};`;
					});
					return cookies;
				}
			}),
			{
				name: 'token-storage'
			}
		)
	)
);
