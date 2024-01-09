import { ProjectCardProps } from './ProjectCardTypes'
import { useNavigate } from 'react-router-dom'

import './ProjectCard.scss'

const ProjectCard = ({ project }: ProjectCardProps) => {
  const navigate = useNavigate()

  const handleNavigateToProject = () => {
    navigate('/project', { state: project })
  }

  return (
    <div className='project-card' onClick={handleNavigateToProject}>
      <div className='upper-text'>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
      </div>
      <div className='bottom-text'>
        <div>
          <span>Leader:</span>
          <span>{project.leader}</span>
        </div>
        <div>
          <span>Created at:</span>
          <span>{project.createdAt}</span>
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
