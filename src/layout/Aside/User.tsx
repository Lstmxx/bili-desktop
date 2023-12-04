import { useEffect } from 'react';
import Login from './Login/Login';
import { handleGetSelfInfo } from '@/lib/user';

const UserInfo = () => {
	return <div>userInfo</div>;
};

export default function User () {
	const isLogin = false;
	useEffect(() => {
		handleGetSelfInfo();
	}, []);
	return isLogin ? <UserInfo /> : <Login />;
}
