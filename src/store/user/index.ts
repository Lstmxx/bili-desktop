import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

interface UserStore {
	userInfo: any;
	setUserInfo: (userInfo: any) => void;
}

export const useUserStore = create<UserStore>()(
	devtools(
		persist(
			(set) => ({
				userInfo: 0,
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
