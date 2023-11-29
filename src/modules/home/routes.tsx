import type { RouteObject } from 'react-router-dom';
import Layout from '@/layout/Layout';
import Recommend from './views/recommend';

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Recommend />
      }
    ]
  }
];

export default routes;
