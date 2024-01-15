import Modal from '@mui/material/Modal'
import { CreateProjectModalProps } from './CreateProjectModalTypes'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { doc, writeBatch } from 'firebase/firestore'
import { db } from '../../config/firebase/firebase'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { CreateDate } from '../../utils/CreateDate'
import { toast } from 'react-toastify'
import { toastOptions } from '../../config/toasts/toastOptions'
import { v4 as uuid } from 'uuid'
import { changeOwnProjects } from '../../redux/features/auth-slice/auth-slice'

import './CreateProjectModal.scss'

const CreateProjectModal = ({
  isOpen,
  closeModal,
}: CreateProjectModalProps) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const user = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const handleCreateProject = async () => {
    if (!user) return

    if (!title || !description) {
      toast.error('Inputs cannot be empty', toastOptions)
      return
    }
    const projectID = uuid()

    const batch = writeBatch(db)
    const projectRef = doc(db, 'projects', projectID)

    batch.set(projectRef, {
      leader: user.email,
      title: title,
      description: description,
      createdAt: CreateDate(),
      workers: [
        {
          email: user.email,
          role: 'Leader',
        },
      ],
      unassignedTasks: [],
      sprint: null,
    })

    const userRef = doc(db, 'users', user.email!)
    batch.update(userRef, {
      ownProjects: [...user.ownProjects, projectID],
    })

    try {
      await batch.commit()
      dispatch(changeOwnProjects([...user.ownProjects, projectID]))
      toast.success('Project created', toastOptions)
    } catch (error) {
      toast.error("Couldn't create project", toastOptions)
    }

    closeModal()
    setTitle('')
    setDescription('')
  }

  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div className='create-project-modal'>
        <span className='title'>Create new project</span>
        <form autoComplete='off'>
          <TextField
            label='Project title'
            variant='outlined'
            type='text'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            label='Description'
            variant='outlined'
            type='text'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
          />
          <Button
            variant='contained'
            className='no-projects-button'
            onClick={handleCreateProject}
          >
            Create new project
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export default CreateProjectModal
