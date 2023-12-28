import { Outlet } from 'react-router-dom';
import Header from './Header';
import Aside from './Aside/Aside';
import { useRef, type UIEvent, useEffect } from 'react';
import { debounce } from 'lodash-es';
import { useScrollStore } from '@/layout/store/scroll';

export default function Layout () {
  const contentRef = useRef<HTMLDivElement>(null);
  const isAtBottom = useRef(false);
  const { setScrollRef, publisherAtBottom, setIsNotAtTop } = useScrollStore();
  const handleScroll = debounce((event: UIEvent<HTMLDivElement>) => {
    const { scrollTop, clientHeight, scrollHeight } = event.currentTarget || event.target;
    // 到底部
    console.log(scrollTop, clientHeight, scrollHeight);
    if (!isAtBottom.current && scrollTop + clientHeight >= scrollHeight - 5) {
      isAtBottom.current = true;
      publisherAtBottom().then(() => (isAtBottom.current = false));
    }
    setIsNotAtTop(scrollTop > 0);
  }, 300);

  useEffect(() => {
    if (contentRef.current) {
      setScrollRef(contentRef.current);
    }
  }, [contentRef]);
  return (
    <div className='flex h-screen w-screen '>
      <Aside />
      <div className='flex flex-col flex-1 overflow-hidden'>
        <Header />
        <div
          ref={contentRef}
          className='flex-1 bg-white rounded-tl-lg overflow-y-auto overflow-x-hidden'
          onScroll={handleScroll}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}
