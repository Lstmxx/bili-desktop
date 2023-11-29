import { createBrowserRouter } from 'react-router-dom';
import HomeRoutes from '@/modules/home/routes';

// const lazyLoad = async (path: string) => {
//   const Page = (await import(path)).default;
//   return {
//     element: <Page />
//   };
// };

const router = createBrowserRouter([...HomeRoutes]);

export default router;
