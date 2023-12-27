import { useUserStore } from '@/store/user';
import { useEffect } from 'react';
import useVideoList from '../../hooks/use-video-list';
import { type Video } from '../../api/type';
import Layout from '../../components/Layout';
import { Replay as ReplayIcon, ArrowUpward as ArrowUpwardIcon } from '@mui/icons-material';
import { useScrollStore } from '@/layout/store/scroll';

import UpSvg from '@/assets/icon/up.svg?react';
import Plays from '@/assets/icon/plays.svg?react';

const VideoItem = ({ video }: { video: Video; }) => {
  return (
    <div className='flex flex-col cursor-pointer gap-2'>
      <div className='relative w-full pb-[56%] transition delay-150 duration-300 ease-in-out hover:scale-105 group'>
        <img
          className='w-full h-full absolute left-0 top-0 rounded-lg object-cover'
          src={video.pic}
          alt=''
          referrerPolicy='no-referrer'
          crossOrigin='anonymous'
        />
        <div
          className='
          absolute flex bottom-0 left-0 w-full
          justify-between text-white bg-gradient-to-t from-black p-2
          leading-none transition delay-150 duration-300 ease-in-out group-hover:opacity-0
        '>
          <div className='flex items-center'>
            <Plays width={18} height={18} />
          </div>
        </div>
      </div>
      <div className='flex flex-1 transition-colors hover:text-primary'>
        <h3 className='line-clamp-2 flex-1 m-0' title={video.title}>
          {video.title}
        </h3>
      </div>
      <div className='flex items-center transition-colors text-info text-sm hover:text-primary '>
        {video.rcmd_reason?.content
          ? (
            <span className='text-[#FF7F24] bg-[#FFF0E3] text-follow-icon-size font-bold  mr-1 px-1 rounded-sm'>
              {video.rcmd_reason.content}
            </span>
          )
          : (
            <UpSvg width={18} height={18} />
          )}
        <span className='ml-1 font-bold leading-none'>{video.owner.name}</span>
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
