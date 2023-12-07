import { useState } from 'react';
import type { Video } from '../api/type';
import { getRecommendVideos } from '../api';

export default function useVideoList ({ pageSize }: { pageSize: number; }) {
	const [videos, setVideos] = useState<Video[]>([]);

	const handleGetRecommendVideos = async (type: 'add' | 'reload' = 'reload', items: Video[] = [], ps?: number) => {
		const { data } = await getRecommendVideos({ ps: ps ?? pageSize });
		// 过滤广告视频
		items.push(...data.item.filter((item) => !item.business_info));
		if (items.length < pageSize) {
			// 防止加载太频繁
			setTimeout(() => {
				handleGetRecommendVideos(type, items, pageSize - items.length);
			}, 500);
		} else {
			setVideos((v) => (type === 'add' ? [...v, ...items] : items));
		}
	};

	return {
		handleGetRecommendVideos,
		videos
	};
}
