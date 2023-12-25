import { useRef, useState } from 'react';
import type { Video } from '../api/type';
import { getRecommendVideos } from '../api';

export default function useVideoList ({ pageSize }: { pageSize: number; }) {
	const [videos, setVideos] = useState<Video[]>([]);
	const videoIdMap = useRef<Map<number, boolean>>(new Map());
	const clearVideoIdMap = () => {
		videoIdMap.current.clear();
	};

	const handleFilterSame = (video: Video) => {
		const notExists = !videoIdMap.current.has(video.id);
		if (notExists) {
			videoIdMap.current.set(video.id, true);
		}
		return notExists;
	};

	const handleGetRecommendVideos = async (type: 'add' | 'reload' = 'reload', items: Video[] = [], ps?: number) => {
		if (type === 'reload') {
			clearVideoIdMap();
		}
		const { data } = await getRecommendVideos({ ps: ps ?? pageSize });
		// 过滤广告视频和相同的视频
		items.push(...data.item.filter((item) => !item.business_info && handleFilterSame(item)));
		if (items.length < pageSize) {
			// 防止加载太频繁
			setTimeout(() => {
				handleGetRecommendVideos(type, items, pageSize - items.length);
			}, 500);
		} else {
			setVideos((v) => (type === 'add' ? [...v, ...items] : items));
			console.log('videos', videos);
		}
	};

	return {
		handleGetRecommendVideos,
		clearVideoIdMap,
		videos
	};
}
