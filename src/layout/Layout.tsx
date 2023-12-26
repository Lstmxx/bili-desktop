import { Outlet } from 'react-router-dom';
import Header from './Header';
import Aside from './Aside/Aside';
import { useRef, type UIEvent, useEffect } from 'react';
import { throttle } from 'lodash-es';
import { useScrollStore } from '@/layout/store/scroll';

export default function Layout () {
	const contentRef = useRef<HTMLDivElement>(null);
	const { setScrollRef, publisherAtBottom, setIsNotAtTop } = useScrollStore();
	const handleScroll = throttle(
		(event: UIEvent<HTMLDivElement>) => {
			const { scrollTop, clientHeight, scrollHeight } = event.currentTarget || event.target;
			// 到底部
			if (scrollTop + clientHeight >= scrollHeight - 10) {
				publisherAtBottom();
			}
			setIsNotAtTop(scrollTop > 0);
		},
		300,
		{ leading: true }
	);

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
				<div ref={contentRef} className='flex-1 bg-white rounded-tl-lg overflow-y-auto overflow-x-hidden' onScroll={handleScroll}>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
