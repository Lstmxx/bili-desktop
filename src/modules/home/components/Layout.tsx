interface Props {
	children: {
		header?: React.ReactNode;
		content?: React.ReactNode;
		// 右下角快捷操作
		quick?: React.ReactNode;
	};
}

const Layout = ({ children }: Props) => {
	return (
		<div className='relative flex flex-col items-center'>
			{children.header}
			<div className='flex-1 max-w-[1700px] grid xl:grid-cols-5 lg:grid-cols-4 gap-6 p-6'>{children.content}</div>
			{children.quick && <div className='fixed right-4 bottom-4 '>{children.quick}</div>}
		</div>
	);
};

export default Layout;
