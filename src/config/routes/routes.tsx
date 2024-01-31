import App from '../../App'
import ProtectedRoute from '../../components/ProtectedRoute/ProtectedRoute'
import BacklogPage from '../../pages/BacklogPage/BacklogPage'
import ErrorPage from '../../pages/ErrorPage/ErrorPage'
import HistoryPage from '../../pages/HistoryPage/HistoryPage'
import HomePage from '../../pages/HomePage/HomePage'
import LoginPage from '../../pages/LoginPage/LoginPage'
import ProjectPage from '../../pages/ProjectPage/ProjectPage'
import ProjectUsers from '../../pages/ProjectUsers/ProjectUsers'
import RegisterPage from '../../pages/RegisterPage/RegisterPage'
import ScrumBoardPage from '../../pages/ScrumBoardPage/ScrumBoardPage'
import SettingsPage from '../../pages/SettingsPage/SettingsPage'

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
            path: 'board',
            element: <ProtectedRoute component={<ScrumBoardPage />} />,
          },
          {
            path: 'backlog',
            element: <ProtectedRoute component={<BacklogPage />} />,
          },
          {
            path: 'history',
            element: <ProtectedRoute component={<HistoryPage />} />,
          },
          {
            path: 'settings',
            element: <ProtectedRoute component={<SettingsPage />} />,
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
