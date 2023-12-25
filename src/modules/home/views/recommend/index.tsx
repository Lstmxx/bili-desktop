import { useUserStore } from '@/store/user';
import { useEffect } from 'react';
import useVideoList from '../../hooks/use-video-list';
import { type Video } from '../../api/type';
import Layout from '../../components/Layout';
import ReplayIcon from '@mui/icons-material/Replay';

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
	const handleReload = () => {
		onReload();
	};
	return (
		<div className='flex flex-col items-start'>
			<div>hhh</div>
			<div className='flex p-2 bg-white shadow-md rounded-lg cursor-pointer' onClick={handleReload}>
				<ReplayIcon className='text-black' />
			</div>
		</div>
	);
};

export default function Recommend () {
	const { userInfo } = useUserStore();
	const { videos, handleGetRecommendVideos, clearVideoIdMap } = useVideoList({ pageSize: 30 });

	const handleAtBottom = () => {
		console.log('life', 'bottom');
		handleGetRecommendVideos('add');
	};

	useEffect(() => {
		console.log('life', 'effect');
		const timeoutId = setTimeout(async () => {
			await handleGetRecommendVideos();
		});
		return () => {
			console.log('life', 'clear');
			clearTimeout(timeoutId);
			clearVideoIdMap();
		};
	}, [userInfo]);
	return (
		<Layout onScrollBottom={handleAtBottom}>
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
