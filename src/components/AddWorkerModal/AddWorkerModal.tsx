import { Button, Modal, TextField } from '@mui/material'
import { useState } from 'react'
import { useOutletContext } from 'react-router-dom'
import { ProjectOutlet } from '../../pages/ProjectPage/ProjectPageTypes'
import { AddUserModalProps } from './AddWorkerModalTypes'
import { db } from '../../config/firebase/firebase'
import { arrayUnion, doc, getDoc, writeBatch } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { toastOptions } from '../../config/toasts/toastOptions'

import './AddWorkerModal.scss'

const AddWorkerModal = ({ isOpen, closeModal }: AddUserModalProps) => {
  const [email, setEmail] = useState<string>('')
  const { currentProject } = useOutletContext<ProjectOutlet>()

  const handleAddWorker = async () => {
    if (!email) {
      toast.error('Inputs cannot be empty', toastOptions)
      return
    }

    if (currentProject.workers.find((worker) => worker.email === email)) {
      toast.error('User is already in project', toastOptions)
      return
    }

    const workerRef = doc(db, 'users', email)
    const projectRef = doc(db, 'projects', currentProject.id)

    try {
      const workerSnap = await getDoc(workerRef)

      if (workerSnap.exists()) {
        const worker = workerSnap.data()
        const batch = writeBatch(db)

        batch.update(projectRef, {
          workers: arrayUnion({
            email: worker.email,
            role: 'Worker',
          }),
        })
        batch.update(workerRef, {
          sharedProjects: arrayUnion(currentProject.id),
        })

        await batch.commit()
        setEmail('')
        closeModal()
      } else {
        toast.error("User doesn't exists", toastOptions)
      }
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
      <div className='add-worker-modal'>
        <span className='title'>Add new worker</span>
        <form autoComplete='off'>
          <TextField
            label='E-mail'
            variant='outlined'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button
            variant='contained'
            className='no-projects-button'
            onClick={handleAddWorker}
          >
            Add new worker
          </Button>
        </form>
      </div>
    </Modal>
  )
}

export default AddWorkerModal
