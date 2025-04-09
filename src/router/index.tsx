import { createBrowserRouter } from 'react-router-dom';
import { HomePage } from '../pages/home';
import { Layout } from '../components/common/layout';
import { LoginPage } from '../pages/login';
import { ProtectedRoute } from '../components/auth/protectedRoute';
import { UserInfoPage } from '../pages/profile'
import { RegisterPage } from '../pages/register';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
      path: '/profile',
      element: (
        <ProtectedRoute>
          <UserInfoPage />
        </ProtectedRoute>
        ),
      },
      {
        path:'/register',
        element:<RegisterPage/>
      }

    ]
  }
]);