import { useNavigate, useOutletContext } from 'react-router-dom'
import ScrumBoard from '../../components/ScrumBoard/ScrumBoard'
import { ProjectOutlet } from '../ProjectPage/ProjectPageTypes'
import { Button } from '@mui/material'
import { useEffect, useState } from 'react'
import { Task } from '../../interfaces/Project'

import './ScrumBoardPage.scss'

const ScrumBoardPage = () => {
  const { currentProject } = useOutletContext<ProjectOutlet>()

  const [tasks, setTasks] = useState<Task[]>(currentProject.tasks)

  const navigate = useNavigate()

  const handleNavigateToBacklog = () => {
    navigate('/project/backlog', { replace: true, state: currentProject })
  }

  useEffect(() => {
    setTasks(currentProject.tasks)
  }, [currentProject])

  return (
    <div className='scrum-board-page'>
      {currentProject.sprint.isRunning ? (
        <>
          <h2>{currentProject.sprint.title}</h2>
          <ScrumBoard tasks={tasks} setTasks={setTasks} />
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
