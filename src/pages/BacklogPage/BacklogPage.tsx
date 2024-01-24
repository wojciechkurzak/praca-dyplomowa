import CreateTaskModal from '../../components/CreateTaskModal/CreateTaskModal'
import { useState } from 'react'
import BacklogTask from '../../components/BacklogTask/BacklogTask'
import { Button } from '@mui/material'
import { useOutletContext } from 'react-router-dom'
import { ProjectOutlet } from '../ProjectPage/ProjectPageTypes'

import './BacklogPage.scss'
import DatePickerValue from '../../components/DatePicker/DatePicker'

const BacklogPage = () => {
  const [createTaskModal, setCreateTaskModal] = useState<boolean>(false)

  const { currentProject } = useOutletContext<ProjectOutlet>()

  const sprintTasks = currentProject.tasks.filter((task) => task.isSprint)
  const unassignedTasks = currentProject.tasks.filter((task) => !task.isSprint)

  const handleOpenCreateTaskModal = () => {
    setCreateTaskModal(true)
  }

  const handleCloseCreateTaskModal = () => {
    setCreateTaskModal(false)
  }

  return (
    <section className='backlog-page'>
      <div className='backlog-sprint'>
        <div className='title'>
          <h2>Active sprint:</h2>
          <Button
            variant='contained'
            className='no-projects-button'
            onClick={handleOpenCreateTaskModal}
          >
            Start sprint
          </Button>
        </div>
        <div className='sprint'>
          <div className='text-upper'>
            <h3>{currentProject.sprint.title}</h3>
            <DatePickerValue />
          </div>
          <div className='tasks'>
            {sprintTasks.length !== 0 ? (
              sprintTasks.map((task, index) => (
                <BacklogTask task={task} key={index} />
              ))
            ) : (
              <div className='no-tasks'>
                <span>No tasks</span>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className='backlog-tasks'>
        <div className='title'>
          <h2>Tasks:</h2>
          <Button
            variant='contained'
            className='no-projects-button'
            onClick={handleOpenCreateTaskModal}
          >
            Create new task
          </Button>
        </div>
        <div className='tasks'>
          {unassignedTasks.length !== 0 ? (
            unassignedTasks.map((task, index) => (
              <BacklogTask task={task} key={index} />
            ))
          ) : (
            <div className='no-tasks'>
              <span>No tasks</span>
            </div>
          )}
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
