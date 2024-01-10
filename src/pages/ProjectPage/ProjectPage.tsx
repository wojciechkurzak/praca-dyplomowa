import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HomeTopBar from '../../components/HomeTopBar/HomeTopBar'
import ProjectNavigation from '../../components/ProjectNavigation/ProjectNavigation'
import Loading from '../../components/Loading/Loading'
import { Project } from '../../interfaces/Project'

import './ProjectPage.scss'

const ProjectPage = () => {
  const [project, setProject] = useState<Project | null>(null)
  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!state && !project) navigate('/home', { replace: true })
    setProject(state)
  }, [])

  return project ? (
    <div className='project-page'>
      <HomeTopBar title={project.title} />
      <div className='project-main'>
        <ProjectNavigation project={project} />
        <main>
          <Outlet />
        </main>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default ProjectPage
