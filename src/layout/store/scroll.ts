import { create } from 'zustand';

interface Bottom {
	publisherAtBottom: () => void;
	removeAtBottomCb: (name: string) => void;
	atBottomCbList: Array<{ name: string; cb: () => void; }>;
	subscribeAtBottom: (name: string, cb: () => void) => void;
}

interface ScrollStore extends Bottom {
	scrollRef: HTMLDivElement | null;
	setScrollRef: (ref: HTMLDivElement) => void;
	isNotAtTop: boolean;
	setIsNotAtTop: (isNotAtTop: boolean) => void;
	scrollTop: () => void;
}

export const useScrollStore = create<ScrollStore>()((set, get) => ({
	scrollRef: null,
	atBottomCbList: [],
	isNotAtTop: false,
	setIsNotAtTop: (isNotAtTop: boolean) => {
		set(() => ({ isNotAtTop }));
	},
	setScrollRef: (ref: HTMLDivElement | null) => {
		set(() => ({ scrollRef: ref }));
	},
	removeAtBottomCb: (name: string) => {
		const { atBottomCbList } = get();
		const index = atBottomCbList.findIndex((item) => name === item.name);
		if (index !== -1) {
			atBottomCbList.splice(index, 1);
		}
		set(() => ({ atBottomCbList }));
	},
	publisherAtBottom: () => {
		const { atBottomCbList } = get();
		atBottomCbList.forEach((item) => {
			item.cb();
		});
	},
	subscribeAtBottom: (name, cb) => {
		const { atBottomCbList } = get();
		const index = atBottomCbList.findIndex((item) => name === item.name);
		if (index === -1) {
			set(() => ({ atBottomCbList: [...atBottomCbList, { name, cb }] }));
		}
	},
	scrollTop: () => {
		const { scrollRef } = get();
		scrollRef?.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	}
}));
