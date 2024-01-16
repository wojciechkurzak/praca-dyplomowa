import CreateTaskModal from '../../components/CreateTaskModal/CreateTaskModal'
import { useState } from 'react'
import BacklogTask from '../../components/BacklogTask/BacklogTask'
import { Button } from '@mui/material'
import { useLocation } from 'react-router-dom'
import { useAppSelector } from '../../redux/hooks'

import './BacklogPage.scss'

const BacklogPage = () => {
  const [createTaskModal, setCreateTaskModal] = useState<boolean>(false)

  const { state } = useLocation()

  const projects = useAppSelector((state) => state.projects.ownProjects)
  const project = projects.find((project) => project.id === state.id)

  const handleOpenCreateTaskModal = () => {
    setCreateTaskModal(true)
  }

  const handleCloseCreateTaskModal = () => {
    setCreateTaskModal(false)
  }

  return (
    <section className='backlog-page'>
      <h2>Active sprint:</h2>
      <div className='backlog-tasks'>
        <div className='title'>
          <h2>Backlog:</h2>
          <Button
            variant='contained'
            className='no-projects-button'
            onClick={handleOpenCreateTaskModal}
          >
            Create new task
          </Button>
        </div>
        <div className='tasks'>
          {project!.unassignedTasks.map((task, index) => (
            <BacklogTask task={task} key={index} />
          ))}
        </div>
      </div>
      <CreateTaskModal
        isOpen={createTaskModal}
        closeModal={handleCloseCreateTaskModal}
      />
    </section>
  )
}

export default BacklogPage
