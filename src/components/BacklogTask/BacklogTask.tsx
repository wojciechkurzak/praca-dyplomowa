import { useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { IoMdSettings } from 'react-icons/io'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { changeProjects } from '../../redux/features/projects-slice/projects-slice'
import DeleteModal from '../DeleteModal/DeleteModal'
import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase/firebase'
import { BacklogTaskProps } from './BacklogTaskTypes'
import { toast } from 'react-toastify'
import { toastOptions } from '../../config/toasts/toastOptions'
import { useOutletContext } from 'react-router-dom'
import { ProjectOutlet } from '../../pages/ProjectPage/ProjectPageTypes'
import EditTaskModal from '../EditTaskModal/EditTaskModal'

import './BacklogTask.scss'

const BacklogTask = ({ task }: BacklogTaskProps) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
  const [editModal, setEditModal] = useState<boolean>(false)
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const dispatch = useAppDispatch()

  const projects = useAppSelector((state) => state.projects)
  const { currentProject } = useOutletContext<ProjectOutlet>()

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleOpenDeleteModal = () => {
    setDeleteModal(true)
  }

  const handleCloseDeleteModal = () => {
    setDeleteModal(false)
  }

  const handleOpenEditModal = () => {
    setEditModal(true)
  }

  const handleCloseEditModal = () => {
    setEditModal(false)
  }

  const handleDeleteTask = async () => {
    const newTasks = currentProject.tasks.filter(
      (currentTask) => currentTask.id !== task.id
    )

    const newProjects = projects.map((project) => {
      if (currentProject.id === project.id)
        return {
          ...currentProject,
          tasks: newTasks,
        }
      else return project
    })

    try {
      const projectRef = doc(db, 'projects', currentProject.id)

      await updateDoc(projectRef, {
        tasks: arrayRemove(task),
      })

      dispatch(changeProjects(newProjects))
      handleCloseDeleteModal()
      handleClose()
    } catch (error) {
      toast.error('Something went wrong', toastOptions)
    }
  }

  const handleMoveTo = async (moveToSprint: boolean) => {
    const newTasks = currentProject.tasks.map((currentTask) => {
      if (currentTask.id === task.id) {
        return {
          ...task,
          isSprint: moveToSprint,
        }
      } else return currentTask
    })

    const newProjects = projects.map((project) => {
      if (project.id === currentProject.id) {
        return {
          ...currentProject,
          tasks: newTasks,
        }
      } else return project
    })

    try {
      const projectRef = doc(db, 'projects', currentProject.id)

      await updateDoc(projectRef, {
        tasks: newTasks,
      })

      dispatch(changeProjects(newProjects))
      handleClose()
    } catch (error) {
      toast.error('Something went wrong', toastOptions)
    }
  }

  return (
    <>
      <div className='backlog-task'>
        <span className='task-title'>{task.title}</span>
        <div className='options'>
          <span>{task.status}</span>
          <span>{task.assignment ? task.assignment : 'not assigned'}</span>
          <Button
            variant='contained'
            className='no-projects-button'
            onClick={handleClick}
          >
            <IoMdSettings size={22} />
          </Button>
          <Menu
            className='backlog-task-menu'
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
          >
            {task.isSprint ? (
              <MenuItem onClick={() => handleMoveTo(false)}>Remove</MenuItem>
            ) : (
              <MenuItem onClick={() => handleMoveTo(true)}>
                Move to sprint
              </MenuItem>
            )}

            <MenuItem onClick={handleOpenEditModal}>Edit</MenuItem>
            <MenuItem onClick={handleOpenDeleteModal}>Delete</MenuItem>
          </Menu>
        </div>
      </div>
      <EditTaskModal
        isOpen={editModal}
        closeModal={handleCloseEditModal}
        task={task}
      />
      <DeleteModal
        isOpen={deleteModal}
        closeModal={handleCloseDeleteModal}
        onDelete={handleDeleteTask}
      />
    </>
  )
}

export default BacklogTask
