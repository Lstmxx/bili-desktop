import { getSelfInfo } from '@/api/user';
import { useTokenStore } from '@/store/token';
import { useUserStore } from '@/store/user';

export const handleGetSelfInfo = async () => {
  const { data } = await getSelfInfo();
  console.log(data);
  useUserStore.getState().setUserInfo(data);
  return data;
};

export const logout = () => {
  useUserStore.getState().setUserInfo(null);
  useTokenStore.getState().clearCredential();
};
