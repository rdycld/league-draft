import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Playground } from 'routes/Playground';
import { DraftPage } from 'routes/Draft';

import * as Layout from '@/layout';
import { useTheme } from './hooks/useTheme';
import { concat } from './utils/concat';
import { page } from './styles.css';
import { themes } from './styles/theme.css';
import { AppBar } from './components/AppBar';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout.EdgeToEdge />,
    children: [
      {
        path: '/',
        element: <DraftPage />,
      },
    ],
  },
  {
    path: '/playground',
    element: <Playground />,
  },
]);

export function App() {
  const { theme, toggle } = useTheme();
  return (
    <main className={concat(page, themes[theme ?? 'dark'])}>
      <AppBar theme={theme} toggle={toggle} />
      <RouterProvider router={router} />
    </main>
  );
}
