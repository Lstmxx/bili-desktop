import { getSelfInfo } from '@/api/user';

export const handleGetSelfInfo = async () => {
	const res = await getSelfInfo();
	console.log('useInfo', res);
};
