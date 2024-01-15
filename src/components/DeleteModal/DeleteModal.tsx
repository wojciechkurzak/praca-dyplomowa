import { Button, Modal } from '@mui/material'
import { DeleteModalProps } from './DeleteModalType'

import './DeleteModal.scss'

const DeleteModal = ({ isOpen, closeModal, onDelete }: DeleteModalProps) => {
  return (
    <Modal
      open={isOpen}
      onClose={closeModal}
      aria-labelledby='modal-modal-title'
      aria-describedby='modal-modal-description'
    >
      <div className='delete-modal'>
        <span className='title'>Are you sure?</span>
        <div className='buttons'>
          <Button variant='contained' className='delete' onClick={onDelete}>
            Delete
          </Button>
          <Button variant='contained' onClick={closeModal}>
            Cancel
          </Button>
        </div>
      </div>
    </Modal>
  )
}

export default DeleteModal
