import { useLocation } from 'react-router-dom'

const ProjectPage = () => {
  const { state } = useLocation()
  return <div className='project-page'>{state.id}</div>
}

export default ProjectPage
