import { useUserStore } from '@/store/user';
import { useEffect } from 'react';
import useVideoList from '../../hooks/use-video-list';
import { type Video } from '../../api/type';
import Layout from '../../components/Layout';
import { Replay as ReplayIcon, ArrowUpward as ArrowUpwardIcon } from '@mui/icons-material';
import { useScrollStore } from '@/layout/store/scroll';

const VideoItem = ({ video }: { video: Video; }) => {
	return (
		<div className='flex flex-col overflow-hidden cursor-pointer'>
			<div className='relative w-full pb-[56%] rounded-lg overflow-hidden'>
				<img className='w-full h-full absolute left-0 top-0' src={video.pic} alt='' referrerPolicy='no-referrer' crossOrigin='anonymous' />
			</div>
			<div className='flex p-2'>
				<h3 className='line-clamp-2 flex-1 m-0' title={video.title}>
					{video.title}
				</h3>
			</div>
		</div>
	);
};

const QuickAction = ({ onReload }: { onReload: () => void; }) => {
	const { scrollTop, isNotAtTop } = useScrollStore();
	const handleReload = () => {
		onReload();
	};
	const handleScrollTop = () => {
		scrollTop();
	};
	return (
		<div className='flex flex-col items-start gap-4'>
			{isNotAtTop && (
				<div className='flex p-2 bg-white shadow-md rounded-lg cursor-pointer' onClick={handleScrollTop}>
					<ArrowUpwardIcon className='text-3xl text-black' />
				</div>
			)}
			<div className='flex p-2 bg-white shadow-md rounded-lg cursor-pointer' onClick={handleReload}>
				<ReplayIcon className='text-3xl text-black' />
			</div>
		</div>
	);
};

export default function Recommend () {
	const { userInfo } = useUserStore();
	const { subscribeAtBottom, removeAtBottomCb } = useScrollStore();
	const { videos, handleGetRecommendVideos, clearVideoIdMap } = useVideoList({ pageSize: 30 });

	const handleAtBottom = () => {
		console.log('life', 'bottom');
		handleGetRecommendVideos('add');
	};

	useEffect(() => {
		console.log('userInfo', userInfo);
		console.log('life', 'effect');
		const timeoutId = setTimeout(() => {
			handleGetRecommendVideos();
		});

		return () => {
			console.log('life', 'clear');
			clearTimeout(timeoutId);
			clearVideoIdMap();
		};
	}, [userInfo]);

	useEffect(() => {
		subscribeAtBottom('recommend', handleAtBottom);
		return () => {
			removeAtBottomCb('recommend');
		};
	}, []);
	return (
		<Layout>
			{{
				content: (
					<>
						{videos.map((video) => (
							<VideoItem key={video.id} video={video} />
						))}
					</>
				),
				quick: <QuickAction onReload={handleGetRecommendVideos} />
			}}
		</Layout>
	);
}
