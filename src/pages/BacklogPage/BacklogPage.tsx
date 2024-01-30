import CreateTaskModal from '../../components/CreateTaskModal/CreateTaskModal'
import { useState } from 'react'
import BacklogTask from '../../components/BacklogTask/BacklogTask'
import { Button } from '@mui/material'
import { useOutletContext } from 'react-router-dom'
import { ProjectOutlet } from '../ProjectPage/ProjectPageTypes'
import DatePicker from '../../components/DatePicker/DatePicker'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { changeProjects } from '../../redux/features/projects-slice/projects-slice'
import dayjs, { Dayjs } from 'dayjs'
import { toast } from 'react-toastify'
import { toastOptions } from '../../config/toasts/toastOptions'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase/firebase'

import './BacklogPage.scss'

const BacklogPage = () => {
  const [createTaskModal, setCreateTaskModal] = useState<boolean>(false)
  const [date, setDate] = useState<Dayjs>(dayjs().add(7, 'day'))

  const { currentProject } = useOutletContext<ProjectOutlet>()
  const projects = useAppSelector((state) => state.projects)
  const dispatch = useAppDispatch()

  const sprintTasks = currentProject.tasks.filter((task) => task.isSprint)
  const unassignedTasks = currentProject.tasks.filter((task) => !task.isSprint)

  const handleOpenCreateTaskModal = () => {
    setCreateTaskModal(true)
  }

  const handleCloseCreateTaskModal = () => {
    setCreateTaskModal(false)
  }

  const handleStartSprint = async () => {
    const newSprint = {
      isRunning: true,
      startAt: dayjs().format('DD/MM/YYYY'),
      endAt: date.format('DD/MM/YYYY'),
      title: currentProject.sprint.title,
    }

    const newProjects = projects.map((project) => {
      if (currentProject.id === project.id)
        return {
          ...currentProject,
          sprint: newSprint,
        }
      else return project
    })

    try {
      const projectRef = doc(db, 'projects', currentProject.id)

      await updateDoc(projectRef, {
        sprint: newSprint,
      })

      dispatch(changeProjects(newProjects))
    } catch (error) {
      toast.error('Something went wrong', toastOptions)
    }
  }

  const handleStopSprint = async () => {
    const newTasks = currentProject.tasks
      .filter((task) => {
        if (task.isSprint && task.status === 'done') return
        return task
      })
      .map((task) => {
        return { ...task, isSprint: false }
      })

    const newHistory = [
      ...currentProject.history,
      {
        title: currentProject.sprint.title,
        startAt: currentProject.sprint.startAt,
        endAt: currentProject.sprint.endAt,
        tasks: currentProject.tasks.filter(
          (task) => task.isSprint && task.status === 'done'
        ),
      },
    ]

    const newSprint = {
      isRunning: false,
      startAt: null,
      endAt: null,
      title: `Sprint ${currentProject.history.length + 2}`,
    }

    const newProjects = projects.map((project) => {
      if (currentProject.id === project.id)
        return {
          ...currentProject,
          sprint: newSprint,
          tasks: newTasks,
          history: newHistory,
        }
      else return project
    })

    try {
      const projectRef = doc(db, 'projects', currentProject.id)

      await updateDoc(projectRef, {
        sprint: newSprint,
        tasks: newTasks,
        history: newHistory,
      })

      dispatch(changeProjects(newProjects))
    } catch (error) {
      toast.error('Something went wrong', toastOptions)
    }
  }

  return (
    <section className='backlog-page'>
      <div className='backlog-sprint'>
        <div className='title'>
          <h2>Active sprint:</h2>
          <Button
            variant='contained'
            className='no-projects-button'
            onClick={() =>
              !currentProject.sprint.isRunning
                ? handleStartSprint()
                : handleStopSprint()
            }
          >
            {!currentProject.sprint.isRunning ? 'Start sprint' : 'Stop sprint'}
          </Button>
        </div>
        <div className='sprint'>
          <div className='text-upper'>
            <h3>{currentProject.sprint.title}</h3>
            <DatePicker date={date} setDate={setDate} />
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
