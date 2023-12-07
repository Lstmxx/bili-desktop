import { Outlet } from 'react-router-dom';
import Header from './Header';
import Aside from './Aside/Aside';

export default function Layout () {
	return (
		<div className='flex h-screen w-screen '>
			<Aside />
			<div className='flex flex-col flex-1 overflow-hidden'>
				<Header />
				<div className='flex-1 bg-white rounded-tl-lg overflow-scroll'>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
