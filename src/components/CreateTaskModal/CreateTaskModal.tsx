import { Button, Modal, TextField } from '@mui/material'
import { useState } from 'react'
import { CreateTaskModalProps } from './CreateTaskModalTypes'
import { v4 as uuid } from 'uuid'
import { useOutletContext } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { changeProjects } from '../../redux/features/projects-slice/projects-slice'
import { Project } from '../../interfaces/Project'
import { arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase/firebase'
import { toastOptions } from '../../config/toasts/toastOptions'
import { toast } from 'react-toastify'
import { ProjectOutlet } from '../../pages/ProjectPage/ProjectPageTypes'

import './CreateTaskModal.scss'

const CreateTaskModal = ({ isOpen, closeModal }: CreateTaskModalProps) => {
  const [title, setTitle] = useState<string>('')

  const { currentProject } = useOutletContext<ProjectOutlet>()
  const projects = useAppSelector((state) => state.projects)
  const dispatch = useAppDispatch()

  const handleCreateTask = async () => {
    const newTask = {
      id: uuid(),
      title: title,
      status: 'todo',
      assignment: null,
      isSprint: false,
    }

    const newProjects = projects.map((project) => {
      if (project.id === currentProject.id)
        return {
          ...currentProject,
          tasks: [...currentProject.tasks, newTask],
        }
      else return project
    })

    try {
      const projectRef = doc(db, 'projects', currentProject.id)

      await updateDoc(projectRef, {
        tasks: arrayUnion(newTask),
      })

      dispatch(changeProjects(newProjects as Project[]))
      setTitle('')
      closeModal()
    } catch (error) {
      toast.error('Something went wrong', toastOptions)
    }
  }

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div className='create-task-modal'>
        <span className='title'>Create new task</span>
        <form autoComplete='off'>
          <TextField
            label='New task'
            variant='outlined'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Button
            variant='contained'
            className='no-projects-button'
            onClick={handleCreateTask}
          >
            Create new task
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export default CreateTaskModal
