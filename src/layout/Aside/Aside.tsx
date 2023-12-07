import User from './User';

export default function Aside () {
	return (
		<div className='flex flex-col items-center justify-between w-20 bg-[#f6f7f8]'>
			<div className='mt-20 flex flex-col items-center'>
				<User />
			</div>
			<div className=''>tool</div>
		</div>
	);
}
