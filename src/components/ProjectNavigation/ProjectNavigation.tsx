import { NavLink } from 'react-router-dom'
import { ProjectNavigationProps } from './ProjectNavigationTypes'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { changeProjectNavigationState } from '../../redux/features/project-navigation-slice/project-navigation-slice'

import './ProjectNavigation.scss'

const routes = [
  { location: '/project/board', name: 'Scrum board' },
  { location: '/project/backlog', name: 'Backlog' },
  { location: '/project/history', name: 'Sprint history' },
  { location: '/project/users', name: 'Users' },
  { location: '/project/settings', name: 'Settings' },
]

const ProjectNavigation = ({ project }: ProjectNavigationProps) => {
  const visible = useAppSelector((state) => state.projectNavigation)
  const dispatch = useAppDispatch()

  const handleProjectNavigationClose = () => {
    dispatch(changeProjectNavigationState(false))
  }

  return (
    <nav className={visible ? 'project-navigation open' : 'project-navigation'}>
      <ul>
        {routes.map((route) => (
          <li key={route.name} onClick={handleProjectNavigationClose}>
            <NavLink to={route.location} state={project} replace={true}>
              {route.name}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default ProjectNavigation
