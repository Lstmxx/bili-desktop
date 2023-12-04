import { type IUserInfo } from '@/api/user/type';
import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserStore {
	userInfo: IUserInfo | null;
	setUserInfo: (userInfo: IUserInfo | null) => void;
}

export const useUserStore = create<UserStore>()(
	devtools(
		persist(
			(set) => ({
				userInfo: null,
				setUserInfo: (userInfo) => {
					set((state) => ({ ...state, userInfo }));
				}
			}),
			{
				name: 'user-storage'
			}
		)
	)
);
