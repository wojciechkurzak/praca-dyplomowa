import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HomeTopBar from '../../components/HomeTopBar/HomeTopBar'
import ProjectNavigation from '../../components/ProjectNavigation/ProjectNavigation'
import { Project } from '../../interfaces/Project'
import { useAppSelector } from '../../redux/hooks'
import Loading from '../../components/Loading/Loading'

import './ProjectPage.scss'

const ProjectPage = () => {
  const [project, setProject] = useState<Project | null>(null)
  const { state } = useLocation()
  const navigate = useNavigate()

  const projects = useAppSelector((state) => state.projects.ownProjects)

  useEffect(() => {
    if (!state) navigate('/home', { replace: true })
    else
      setProject(projects.find((project) => project.id === state.id) as Project)
  }, [])

  return project ? (
    <div className='project-page'>
      <HomeTopBar title={project.title} />
      <div className='project-main'>
        <ProjectNavigation project={project} />
        <main>
          <Outlet context={{ currentProject: project }} />
        </main>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default ProjectPage
