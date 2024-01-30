import { useNavigate, useOutletContext } from 'react-router-dom'
import ScrumBoard from '../../components/ScrumBoard/ScrumBoard'
import { ProjectOutlet } from '../ProjectPage/ProjectPageTypes'
import { Button } from '@mui/material'

import './ScrumBoardPage.scss'

const ScrumBoardPage = () => {
  const { currentProject } = useOutletContext<ProjectOutlet>()

  const navigate = useNavigate()

  const handleNavigateToBacklog = () => {
    navigate('/project/backlog', { replace: true })
  }

  return (
    <div className='scrum-board-page'>
      {currentProject.sprint.isRunning ? (
        <>
          <h2>{currentProject.sprint.title}</h2>
          <ScrumBoard />
        </>
      ) : (
        <div className='no-sprint'>
          <span>No active sprint</span>
          <Button
            variant='contained'
            className='no-projects-button'
            onClick={handleNavigateToBacklog}
          >
            Go to backlog
          </Button>
        </div>
      )}
    </div>
  )
}

export default ScrumBoardPage
