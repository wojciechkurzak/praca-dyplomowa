import ProjectCard from '../ProjectCard/ProjectCard'
import { ProjectListProps } from './ProjectListTypes'
import { Button } from '@mui/material'

import './ProjectList.scss'

const ProjectList = ({
  projects,
  title,
  addProjects = false,
  openModal,
}: ProjectListProps) => {
  return (
    <div className='project-list'>
      <div className='title'>
        <h2>{title}</h2>
        {addProjects && (
          <Button
            variant='contained'
            className='no-projects-button'
            onClick={openModal}
          >
            Create new project
          </Button>
        )}
      </div>
      <div className='list'>
        {projects.map((project) => (
          <ProjectCard project={project} key={project.id} />
        ))}
      </div>
    </div>
  )
}

export default ProjectList
