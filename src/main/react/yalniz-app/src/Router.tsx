import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import DashboardPage from './pages/Dashboard.page';

const router = createBrowserRouter([
  {
    path: '/',
    element: <DashboardPage />,
  },
]);

export function Router() {
  return <RouterProvider router={router} />;
}
