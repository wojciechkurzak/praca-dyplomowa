import { Button } from '@mui/material'
import { WorkerCardProps } from './WorkerCardTypes'
import { IoMdClose } from 'react-icons/io'
import { useState } from 'react'
import DeleteModal from '../DeleteModal/DeleteModal'
import { useOutletContext } from 'react-router-dom'
import { ProjectOutlet } from '../../pages/ProjectPage/ProjectPageTypes'
import { arrayRemove, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../config/firebase/firebase'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { changeProjects } from '../../redux/features/projects-slice/projects-slice'
import { Project } from '../../interfaces/Project'
import { toast } from 'react-toastify'
import { toastOptions } from '../../config/toasts/toastOptions'
import { IoBanOutline } from 'react-icons/io5'

import './WorkerCard.scss'

const WorkerCard = ({ worker }: WorkerCardProps) => {
  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  const projects = useAppSelector((state) => state.projects)
  const dispatch = useAppDispatch()
  const { currentProject } = useOutletContext<ProjectOutlet>()

  const handleOpenDeleteModal = () => {
    setDeleteModal(true)
  }

  const handleCloseDeleteModal = () => {
    setDeleteModal(false)
  }

  const handleDeleteWorker = async () => {
    const newWorkers = currentProject.workers.filter(
      (currentWorker) => currentWorker.email !== worker.email
    )

    const newProjects = projects.map((project) => {
      if (currentProject.id === project.id)
        return {
          ...project,
          workers: newWorkers,
        }
      else return project
    })

    try {
      const projectRef = doc(db, 'projects', currentProject.id)
      const workerRef = doc(db, 'users', worker.email)

      await updateDoc(projectRef, {
        workers: arrayRemove(
          currentProject.workers.find(
            (currentWorker) => currentWorker.email === worker.email
          )
        ),
      })

      await updateDoc(projectRef, {
        workers: arrayRemove(
          currentProject.workers.find(
            (currentWorker) => currentWorker.email === worker.email
          )
        ),
      })

      await updateDoc(workerRef, {
        sharedProjects: arrayRemove(currentProject.id),
      })

      dispatch(changeProjects(newProjects as Project[]))
      handleCloseDeleteModal()
    } catch (error) {
      toast.error('Something went wrong', toastOptions)
    }
  }

  return (
    <div className='worker-card'>
      <div className='text-right'>
        <span className='username'>{worker.username}</span>
        <span className='email'>{worker.email}</span>
        <span className='role'>{worker.role}</span>
      </div>
      <div className='text-left'>
        {worker.role !== 'Leader' ? (
          <Button
            variant='contained'
            className='delete'
            onClick={handleOpenDeleteModal}
          >
            <IoMdClose size={22} />
          </Button>
        ) : (
          <Button variant='contained' className='disabled' disabled={true}>
            <IoBanOutline size={22} />
          </Button>
        )}
      </div>
      <DeleteModal
        isOpen={deleteModal}
        closeModal={handleCloseDeleteModal}
        onDelete={handleDeleteWorker}
      />
    </div>
  )
}

export default WorkerCard
