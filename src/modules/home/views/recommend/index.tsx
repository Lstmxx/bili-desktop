import { useUserStore } from '@/store/user';
import { useEffect } from 'react';
import useVideoList from '../../hooks/use-video-list';
import { type Video } from '../../api/type';
import Layout from '../../components/Layout';
import ReplayIcon from '@mui/icons-material/Replay';
import { Button } from '@mui/material';

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

const QuickAction = () => {
	return (
		<div className='tw-flex flex-col'>
			<Button className='p-4 bg-white' variant='contained'>
				<ReplayIcon className='text-black' />
			</Button>
		</div>
	);
};

export default function Recommend () {
	const { userInfo } = useUserStore();
	const { videos, handleGetRecommendVideos } = useVideoList({ pageSize: 30 });
	useEffect(() => {
		handleGetRecommendVideos();
	}, [userInfo]);
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
				quick: <QuickAction />
			}}
		</Layout>
	);
}
