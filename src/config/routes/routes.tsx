import App from '../../App'
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute'
import ErrorPage from '../../pages/ErrorPage/ErrorPage'
import HomePage from '../../pages/HomePage/HomePage'
import LoginPage from '../../pages/LoginPage/LoginPage'
import RegisterPage from '../../pages/RegisterPage/RegisterPage'

export const routesConfig = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/register',
        element: <RegisterPage />,
      },
      {
        path: '/home',
        element: <ProtectedRoute component={<HomePage />} />,
      },
    ],
  },
]
