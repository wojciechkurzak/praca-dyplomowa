import { NavLink } from 'react-router-dom'
import { ProjectNavigationProps } from './ProjectNavigationTypes'

import './ProjectNavigation.scss'

const ProjectNavigation = ({ project }: ProjectNavigationProps) => {
  return (
    <nav className='project-navigation'>
      <ul>
        <li>
          <NavLink to='/project/board' state={project} replace={true}>
            Scrum board
          </NavLink>
        </li>
        <li>
          <NavLink to='/project/backlog' state={project} replace={true}>
            Backlog
          </NavLink>
        </li>
        <li>
          <NavLink to='/project/history' state={project} replace={true}>
            Task history
          </NavLink>
        </li>
        <li>
          <NavLink to='/project/users' state={project} replace={true}>
            Users
          </NavLink>
        </li>
        <li>
          <NavLink to='/project/settings' state={project} replace={true}>
            Settings
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default ProjectNavigation
