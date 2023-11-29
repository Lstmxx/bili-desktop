import User from './User';

export default function Aside () {
  return (
		<div className='flex flex-col items-center justify-between w-12 text-sm'>
			<div className='flex flex-col items-center'>
				<User />
			</div>
			<div className=''>tool</div>
		</div>
  );
}
