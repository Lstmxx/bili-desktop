import { useUserStore } from '@/store/user';
import { useEffect } from 'react';
import useVideoList from '../../hooks/use-video-list';
import Layout from '../../components/Layout';
import { Replay as ReplayIcon, ArrowUpward as ArrowUpwardIcon } from '@mui/icons-material';
import { useScrollStore } from '@/layout/store/scroll';
import VideoItem from '../../components/VideoItem';
import { type Video } from '../../api/type';
import { showVideoPreview, hiddenVideoPreview } from '../../utils/video-preview';

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

  const handleAtBottom = async () => {
    console.log('life', 'bottom');
    await handleGetRecommendVideos('add');
  };

  const handleShowPreview = (targetRef: HTMLDivElement, video: Video) => {
    showVideoPreview({ target: targetRef, video });
  };

  const handleHiddenPreview = () => {
    hiddenVideoPreview();
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
              <VideoItem
                key={video.id}
                video={video}
                onMouseEnter={handleShowPreview}
                onMouseLeave={handleHiddenPreview}
              />
            ))}
          </>
        ),
        quick: <QuickAction onReload={handleGetRecommendVideos} />
      }}
    </Layout>
  );
}
