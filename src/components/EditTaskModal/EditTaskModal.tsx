import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  TextField,
} from '@mui/material'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { changeProjects } from '../../redux/features/projects-slice/projects-slice'
import { doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase/firebase'
import { toastOptions } from '../../config/toasts/toastOptions'
import { toast } from 'react-toastify'
import { ProjectOutlet } from '../../pages/ProjectPage/ProjectPageTypes'

import './EditTaskModal.scss'
import { EditTaskModalProps } from './EditTaskModalTypes'

const EditTaskModal = ({ isOpen, closeModal, task }: EditTaskModalProps) => {
  const [title, setTitle] = useState<string>(task.title)
  const [assignment, setAssignment] = useState<string>(task.assignment)
  const [status, setStatus] = useState<string>(task.status)

  const { currentProject } = useOutletContext<ProjectOutlet>()
  const projects = useAppSelector((state) => state.projects)
  const dispatch = useAppDispatch()

  const handleEditTask = async () => {
    if (
      (title === task.title &&
        assignment === task.assignment &&
        status === task.status) ||
      title === ''
    ) {
      return
    }

    const newTask = {
      ...task,
      assignment: assignment,
      title: title,
      status: status,
    }

    const newTasks = currentProject.tasks.map((currentTask) =>
      currentTask.id === task.id ? newTask : currentTask
    )

    const newProjects = projects.map((project) => {
      if (project.id === currentProject.id)
        return {
          ...currentProject,
          tasks: newTasks,
        }
      else return project
    })

    try {
      const projectRef = doc(db, 'projects', currentProject.id)

      await updateDoc(projectRef, {
        tasks: newTasks,
      })

      dispatch(changeProjects(newProjects))
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
      <div className='edit-task-modal'>
        <span className='title'>Edit task</span>
        <form autoComplete='off'>
          <TextField
            label='New task'
            variant='outlined'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <FormControl fullWidth>
            <InputLabel id='worker-select'>User</InputLabel>
            <Select
              labelId='worker-select'
              value={assignment}
              label='Age'
              onChange={(e) => setAssignment(e.target.value)}
              className='worker-picker'
            >
              <MenuItem value={'not assigned'}>Not assinged</MenuItem>
              {currentProject.workers.map((worker, index) => (
                <MenuItem value={worker.email} key={index}>
                  <div className='worker-option'>
                    <span className='worker-username'>{worker.username}</span>
                    <span className='worker-email'>{worker.email}</span>
                  </div>
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl fullWidth>
            <InputLabel id='status-select'>Status</InputLabel>
            <Select
              labelId='status-select'
              value={status}
              label='Status'
              onChange={(e) => setStatus(e.target.value)}
              className='worker-picker'
            >
              <MenuItem value={'to do'}>to do</MenuItem>
              <MenuItem value={'in progress'}>in progress</MenuItem>
              <MenuItem value={'done'}>done</MenuItem>
            </Select>
          </FormControl>
          <Button
            variant='contained'
            className='no-projects-button'
            onClick={handleEditTask}
          >
            Edit task
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export default EditTaskModal
