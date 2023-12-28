import { create } from 'zustand';

interface Bottom {
  publisherAtBottom: () => Promise<any>;
  removeAtBottomCb: (name: string) => void;
  atBottomCbList: Array<{ name: string; cb: (() => Promise<any>) | (() => void); }>;
  subscribeAtBottom: (name: string, cb: (() => Promise<any>) | (() => void)) => void;
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
  publisherAtBottom: async () => {
    const { atBottomCbList } = get();
    console.log('publish', atBottomCbList);
    const promiseList: Array<Promise<any>> = [];
    atBottomCbList.forEach((item) => {
      const promise = new Promise((resolve) => {
        const res = item.cb();
        if (res?.then) {
          res.then(resolve); // 等待异步操作完成
          resolve('');
        } else {
          resolve('');
        }
      });
      promiseList.push(promise);
    });
    await Promise.all(promiseList);
  },
  subscribeAtBottom: (name, cb) => {
    const { atBottomCbList } = get();
    const index = atBottomCbList.findIndex((item) => name === item.name);
    if (index === -1) {
      set(() => ({ atBottomCbList: [...atBottomCbList, { name, cb }] }));
    }

    console.log('subscribe', atBottomCbList);
  },
  scrollTop: () => {
    const { scrollRef } = get();
    scrollRef?.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
}));
