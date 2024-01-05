import Modal from '@mui/material/Modal'
import { CreateProjectModalProps } from './CreateProjectModalTypes'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'
import { addDoc, collection } from 'firebase/firestore'
import { db } from '../../config/firebase/firebase'
import { useAppSelector } from '../../redux/hooks'
import { CreateDate } from '../../utils/CreateDate'
import { toast } from 'react-toastify'
import { toastOptions } from '../../config/toasts/toastOptions'

import './CreateProjectModal.scss'

const CreateProjectModal = ({
  isOpen,
  closeModal,
}: CreateProjectModalProps) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const user = useAppSelector((state) => state.auth)

  const handleCreateProject = () => {
    if (!user) return

    if (!title || !description) {
      toast.error('Inputs cannot be empty', toastOptions)
      return
    }

    addDoc(collection(db, 'projects'), {
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
    })
      .then(() => toast.success('Project created', toastOptions))
      .catch(() => toast.error("Couldn't create project", toastOptions))

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
