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
        {projects.length !== 0 ? (
          projects.map((project) => (
            <ProjectCard project={project} key={project.id} />
          ))
        ) : (
          <span className='no-own-projects'>You don't have own projects</span>
        )}
      </div>
    </div>
  )
}

export default ProjectList
