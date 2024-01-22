import { useState } from 'react'
import { Button, Menu, MenuItem } from '@mui/material'
import { IoMdSettings } from 'react-icons/io'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { changeProjects } from '../../redux/features/projects-slice/projects-slice'
import { Project } from '../../interfaces/Project'
import DeleteModal from '../DeleteModal/DeleteModal'
import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase/firebase'
import { BacklogTaskProps } from './BacklogTaskTypes'
import { toast } from 'react-toastify'
import { toastOptions } from '../../config/toasts/toastOptions'
import { useOutletContext } from 'react-router-dom'
import { ProjectOutlet } from '../../pages/ProjectPage/ProjectPageTypes'

import './BacklogTask.scss'

const BacklogTask = ({ task }: BacklogTaskProps) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false)
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

  const handleDeleteTask = async () => {
    const newTasks = currentProject.unassignedTasks.filter(
      (currentTask) => currentTask.id !== task.id
    )

    const newProjects = projects.map((project) => {
      if (currentProject.id === project.id)
        return {
          ...project,
          unassignedTasks: newTasks,
        }
      else return project
    })

    try {
      const projectRef = doc(db, 'projects', currentProject.id)

      await updateDoc(projectRef, {
        unassignedTasks: arrayRemove(
          currentProject.unassignedTasks.find(
            (currentTask) => currentTask.id === task.id
          )
        ),
      })

      dispatch(changeProjects(newProjects as Project[]))
      handleCloseDeleteModal()
      handleClose()
    } catch (error) {
      toast.error('Something went wrong', toastOptions)
    }
  }

  return (
    <>
      <div className='backlog-task'>
        <span>{task.title}</span>
        <div className='text-left'>
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
            <MenuItem>Edit</MenuItem>
            <MenuItem onClick={handleOpenDeleteModal}>Delete</MenuItem>
          </Menu>
        </div>
      </div>
      <DeleteModal
        isOpen={deleteModal}
        closeModal={handleCloseDeleteModal}
        onDelete={handleDeleteTask}
      />
    </>
  )
}

export default BacklogTask
