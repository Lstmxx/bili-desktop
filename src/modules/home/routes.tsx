import { type CustomRouteObject } from '@/type';
import Recommend from './views/recommend';
import Bangumi from './views/bangumi';

const routes: CustomRouteObject[] = [
  {
    name: '推荐',
    index: true,
    path: '/',
    element: <Recommend />
  },
  {
    name: '番剧',
    path: '/bangumi',
    element: <Bangumi />
  }
];

export default routes;
