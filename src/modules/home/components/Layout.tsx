interface Props {
	children: {
		header?: React.ReactNode;
		content?: React.ReactNode;
		// 右下角快捷操作
		quick?: React.ReactNode;
	};
}

export default function Layout ({ children }: Props) {
	return (
		<div className='relative flex flex-col items-center'>
			{children.header}
			<div className='max-w-[1700px] grid xl:grid-cols-5 lg:grid-cols-4 gap-6 p-6'>{children.content}</div>
			{children.quick && <div className='fixed right-4 bottom-4 -translate-y-full -translate-x-full'>{children.quick}</div>}
		</div>
	);
}
