import App from '../../App'
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute'
import BacklogPage from '../../pages/BacklogPage/BacklogPage'
import ErrorPage from '../../pages/ErrorPage/ErrorPage'
import HomePage from '../../pages/HomePage/HomePage'
import LoginPage from '../../pages/LoginPage/LoginPage'
import ProjectPage from '../../pages/ProjectPage/ProjectPage'
import ProjectUsers from '../../pages/ProjectUsers/ProjectUsers'
import RegisterPage from '../../pages/RegisterPage/RegisterPage'

export const routesConfig = [
  {
    path: '/',
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'home',
        element: <ProtectedRoute component={<HomePage />} />,
      },
      {
        path: 'project',
        element: <ProtectedRoute component={<ProjectPage />} />,
        children: [
          {
            path: 'sprint',
            element: <ProtectedRoute component={<div>sprint</div>} />,
          },
          {
            path: 'backlog',
            element: <ProtectedRoute component={<BacklogPage />} />,
          },
          {
            path: 'history',
            element: <ProtectedRoute component={<div>history</div>} />,
          },
          {
            path: 'chat',
            element: <ProtectedRoute component={<div>chat</div>} />,
          },
          {
            path: 'settings',
            element: <ProtectedRoute component={<div>settings</div>} />,
          },
          {
            path: 'users',
            element: <ProtectedRoute component={<ProjectUsers />} />,
          },
        ],
      },
    ],
  },
]
