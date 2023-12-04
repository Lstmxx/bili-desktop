import { useEffect, useState } from 'react';
import Login from './Login/Login';
import { handleGetSelfInfo } from '@/lib/user';
import { useUserStore } from '@/store/user';
import { type IGetRelationStatRes, type IUserInfo } from '@/api/user/type';
import { Avatar, Badge, Popover } from '@mui/material';
import { getRelationStat } from '@/api/user';

const RelationStat = ({ open, mid }: { open: boolean; mid: number; }) => {
	const [statList, setStatList] = useState<Array<{ label: string; value: number; key: keyof IGetRelationStatRes; }>>([
		{ label: '关注', value: 0, key: 'following' },
		{ label: '粉丝', value: 0, key: 'follower' },
		{ label: '动态', value: 0, key: 'dynamic_count' }
	]);
	const handleGetRelation = async () => {
		const { data } = await getRelationStat();
		setStatList(statList.map((stat) => ({ ...stat, value: data[stat.key] })));
		console.log('relation:', data);
	};
	useEffect(() => {
		if (open && mid) {
			handleGetRelation();
		}
	}, [open, mid]);
	return (
		<div className='flex justify-evenly items-center mt-4'>
			{statList.map((stat, index) => (
				<div className='flex flex-col items-center' key={index}>
					<span className='text-lg font-bold'>{stat.value}</span>
					<span className='text-sm text-info'>{stat.label}</span>
				</div>
			))}
		</div>
	);
};

const UserInfo = ({ userInfo, open }: { userInfo: IUserInfo; open: boolean; }) => {
	return (
		<div className='bg-white flex flex-col rounded-sm shadow-lg p-4'>
			<div className='flex items-center'>
				<Avatar className='w-16 h-16 border border-solid border-border' alt={userInfo.name} src={userInfo.face} imgProps={{ referrerPolicy: 'no-referrer', crossOrigin: 'anonymous' }} />
				<div className='flex flex-col ml-4'>
					<div className='flex items-center'>
						<span className='text-lg text-primary font-bold'>{userInfo.name}</span>
						<img className='ml-2' width={28} height={14} src={`/rank/${userInfo.level}.avif`} alt='' />
					</div>
					{userInfo.vip?.label && <img width={80} src={userInfo.vip?.label.img_label_uri_hans_static} alt='' referrerPolicy='no-referrer' crossOrigin='anonymous' />}
				</div>
			</div>
			<RelationStat open={open} mid={userInfo.mid} />
		</div>
	);
};

const UserAvatar = ({ userInfo }: { userInfo: IUserInfo; }) => {
	const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

	const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const open = Boolean(anchorEl);
	return (
		<div>
			<Badge overlap='circular' anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }} variant='dot'>
				<Avatar className='w-10 h-10 cursor-pointer' alt={userInfo.name} src={userInfo.face} imgProps={{ referrerPolicy: 'no-referrer', crossOrigin: 'anonymous' }} onClick={handleClick} />
			</Badge>
			<Popover
				open={open}
				anchorEl={anchorEl}
				onClose={handleClose}
				anchorOrigin={{
					vertical: 'top',
					horizontal: 50
				}}
				transformOrigin={{
					vertical: 'top',
					horizontal: 'left'
				}}
			>
				<UserInfo userInfo={userInfo} open={open} />
			</Popover>
		</div>
	);
};

export default function User () {
	const { userInfo } = useUserStore();
	useEffect(() => {
		handleGetSelfInfo();
	}, []);
	return userInfo ? <UserAvatar userInfo={userInfo} /> : <Login />;
}
