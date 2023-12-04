import { useLoadingStore } from '@/store/loading';
import { CircularProgress } from '@mui/material';

export default function Loading () {
	const { loading } = useLoadingStore();
	return loading
? (
		<div className='flex items-center justify-center h-full w-full fixed left-0 top-0 z-50 bg-black bg-opacity-50'>
			<CircularProgress className='text-primary' />
		</div>
	)
: null;
}
