import { ProjectCardProps } from './ProjectCardTypes'
import './ProjectCard.scss'

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className='project-card'>
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
