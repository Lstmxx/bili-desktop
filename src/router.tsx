import { createBrowserRouter } from 'react-router-dom';
import HomeRoutes from '@/modules/home/routes';
import Layout from './layout/Layout';

// const lazyLoad = async (path: string) => {
//   const Page = (await import(path)).default;
//   return {
//     element: <Page />
//   };
// };

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [...HomeRoutes]
  }
]);

console.log(router);

export default router;
