import { createBrowserRouter } from 'react-router-dom';
import Layout from './layout/Layout';
import HomePage from './views/home/Page';

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
    children: [
      {
        index: true,
        element: <HomePage />
      }
    ]
  }
]);

export default router;
