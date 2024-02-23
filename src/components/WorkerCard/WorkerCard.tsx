import { Button, Menu, MenuItem } from '@mui/material'
import { WorkerCardProps } from './WorkerCardTypes'
import { IoMdSettings } from 'react-icons/io'
import { useState } from 'react'
import DeleteModal from '../DeleteModal/DeleteModal'
import { useOutletContext } from 'react-router-dom'
import { ProjectOutlet } from '../../pages/ProjectPage/ProjectPageTypes'
import { arrayRemove, arrayUnion, doc, writeBatch } from 'firebase/firestore'
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
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const projects = useAppSelector((state) => state.projects)
  const auth = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
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

  const handleMakeLeader = async () => {
    const projectRef = doc(db, 'projects', currentProject.id)
    const prevLeaderRef = doc(db, 'users', currentProject.leader)
    const nextLeaderRef = doc(db, 'users', worker.email)

    const batch = writeBatch(db)

    batch.update(prevLeaderRef, {
      ownProjects: arrayRemove(currentProject.id),
      sharedProjects: arrayUnion(currentProject.id),
    })
    batch.update(nextLeaderRef, {
      ownProjects: arrayUnion(currentProject.id),
      sharedProjects: arrayRemove(currentProject.id),
    })
    batch.update(projectRef, {
      leader: worker.email,
      workers: currentProject.workers.map((currentWorker) => {
        if (currentWorker.email === worker.email)
          return { ...currentWorker, role: 'Leader' }
        else return { ...currentWorker, role: 'Worker' }
      }),
    })
    try {
      await batch.commit()
    } catch (error) {
      toast.error('Something went wrong', toastOptions)
    }
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

    const batch = writeBatch(db)
    const projectRef = doc(db, 'projects', currentProject.id)
    const workerRef = doc(db, 'users', worker.email)

    const workerToDelete = currentProject.workers.find(
      (currentWorker) => currentWorker.email === worker.email
    )

    batch.update(projectRef, {
      workers: arrayRemove({
        email: workerToDelete!.email,
        role: 'Worker',
      }),
    })
    batch.update(workerRef, {
      sharedProjects: arrayRemove(currentProject.id),
    })

    try {
      await batch.commit()
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
        {worker.role !== 'Leader' && currentProject.leader === auth.email ? (
          <>
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
              <MenuItem onClick={handleMakeLeader}>Make leader</MenuItem>
              <MenuItem onClick={handleOpenDeleteModal}>Delete</MenuItem>
            </Menu>
          </>
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
