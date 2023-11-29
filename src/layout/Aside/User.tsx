import Login from './Login/Login';

const UserInfo = () => {
  return <div>userInfo</div>;
};

export default function User () {
  const isLogin = false;
  return isLogin ? <UserInfo /> : <Login />;
}
