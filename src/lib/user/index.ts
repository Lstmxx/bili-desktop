import { getSelfInfo } from '@/api/user';
import { useUserStore } from '@/store/user';

export const handleGetSelfInfo = async () => {
	const { data } = await getSelfInfo();
	console.log(data);
	useUserStore.getState().setUserInfo(data);
	return data;
};
