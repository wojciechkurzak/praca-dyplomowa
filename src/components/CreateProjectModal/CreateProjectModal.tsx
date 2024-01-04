import Modal from '@mui/material/Modal'
import { CreateProjectModalProps } from './CreateProjectModalTypes'

import './CreateProjectModal.scss'
import { Button, TextField } from '@mui/material'
import { useState } from 'react'

const CreateProjectModal = ({
  isOpen,
  closeModal,
}: CreateProjectModalProps) => {
  const [title, setTitle] = useState<string>('')
  const [description, setDescription] = useState<string>('')

  const handleCreateProject = () => {}

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
