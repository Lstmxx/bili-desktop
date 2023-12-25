import { type UIEvent } from 'react';
import { throttle } from 'lodash-es';

interface Props {
	onScrollBottom?: () => void;
	children: {
		header?: React.ReactNode;
		content?: React.ReactNode;
		// 右下角快捷操作
		quick?: React.ReactNode;
	};
}

export default function Layout ({ children, onScrollBottom }: Props) {
	const handleScroll = throttle(
		(event: UIEvent<HTMLDivElement>) => {
			const { scrollTop, clientHeight, scrollHeight } = event.currentTarget || event.target;
			// 到底部
			if (scrollTop + clientHeight >= scrollHeight - 10) {
				onScrollBottom && onScrollBottom();
			}
		},
		1000,
		{ leading: true }
	);
	return (
		<div className='relative flex flex-col items-center h-full overflow-hidden'>
			{children.header}
			<div
				className='flex-1 overflow-y-auto'
				onScroll={(e) => {
					handleScroll(e);
				}}
			>
				<div className=' max-w-[1700px] grid xl:grid-cols-5 lg:grid-cols-4 gap-6 p-6'>{children.content}</div>
			</div>
			{children.quick && <div className='fixed right-4 bottom-4 '>{children.quick}</div>}
		</div>
	);
}
