import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';
import { Playground } from './routes/Playground';
import { DraftPage } from './routes/Draft';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DraftPage />,
  },
  {
    path: '/playground',
    element: <Playground />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
