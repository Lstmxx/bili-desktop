import { Outlet } from 'react-router-dom';
import Header from './Header';
import Aside from './Aside/Aside';

export default function Layout () {
	return (
		<div className='flex flex-col h-screen w-screen bg-primary'>
			<Header />
			<div className='flex mt-10 flex-1 overflow-hidden'>
				<Aside />
				<div className='flex-1 bg-white rounded-tl-lg overflow-scroll'>
					<Outlet />
				</div>
			</div>
		</div>
	);
}
