import App from '../../App'
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute'
import LoginPage from '../../pages/LoginPage'

export const routesConfig = [
  {
    path: '/',
    element: <App />,
    errorElement: <div>404</div>,
    children: [
      {
        path: '/login',
        element: <LoginPage />,
      },
      {
        path: '/home',
        element: <ProtectedRoute component={<div>Home page</div>} />,
      },
    ],
  },
]
