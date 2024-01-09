import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Loading from '../../components/Loading/Loading'
import HomeTopBar from '../../components/HomeTopBar/HomeTopBar'
import ProjectNavigation from '../../components/ProjectNavigation/ProjectNavigation'

import './ProjectPage.scss'

const ProjectPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  const project = state

  useEffect(() => {
    if (!project) navigate('/home', { replace: true })
  }, [])

  return state ? (
    <div className='project-page'>
      <HomeTopBar title={project.title} />
      <div className='project-main'>
        <ProjectNavigation />
        <main></main>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default ProjectPage
