import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Playground } from './routes/Playground';
import { Draft } from './routes/Draft';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Draft />,
  },
  {
    path: '/playground',
    element: <Playground />,
  },
]);

export function App() {
  return <RouterProvider router={router} />;
}
