import UpSvg from '@/assets/icon/up.svg?react';
import PlaysSvg from '@/assets/icon/plays.svg?react';
import CommentSvg from '@/assets/icon/comment.svg?react';
import { type Stat, type Video } from '../api/type';
import { useMemo } from 'react';
import { padZero, formatOverTenThousand } from '@/core/utils/format';

const VideoStat = ({ stat, duration }: { stat: Stat; duration: number; }) => {
  const durationText = useMemo(() => {
    const second = duration % 60;
    const minute = Math.floor(duration / 60);
    const hour = Math.floor(minute / 60);
    return `${hour ? `${hour}:` : ''}${padZero(minute)}:${padZero(second)}`;
  }, [duration]);
  return (
    <div
      className='
          absolute flex bottom-0 left-0 w-full
          justify-between text-white bg-gradient-to-t from-black p-2
          leading-none transition delay-150 duration-300 ease-in-out group-hover:opacity-0
          font-bold items-center
        '>
      <div className='flex items-center'>
        <PlaysSvg width={18} height={18} />
        <span className='ml-1'>{formatOverTenThousand(stat.view)}</span>
        <CommentSvg className='ml-4' width={18} height={18} />
        <span className='ml-1'>{stat.danmaku}</span>
      </div>
      <span>{durationText}</span>
    </div>
  );
};

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
        <VideoStat stat={video.stat} duration={video.duration} />
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

export default VideoItem;
