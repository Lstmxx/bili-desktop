import { useUserStore } from '@/store/user';
import { useEffect } from 'react';
import useVideoList from '../../hooks/use-video-list';
import { type Video } from '../../api/type';

const VideoItem = ({ video }: { video: Video; }) => {
	return (
		<div className='flex flex-col rounded-lg shadow-lg overflow-hidden cursor-pointer'>
			<div className='relative w-full pb-[56%]'>
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

export default function Recommend () {
	const { userInfo } = useUserStore();
	const { videos, handleGetRecommendVideos } = useVideoList({ pageSize: 20 });
	useEffect(() => {
		handleGetRecommendVideos();
	}, [userInfo]);
	return (
		<div className='grid grid-cols-4 gap-6 p-6'>
			{videos.map((video) => (
				<VideoItem key={video.id} video={video} />
			))}
		</div>
	);
}
