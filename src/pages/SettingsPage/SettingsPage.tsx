import { Button, TextField } from '@mui/material'
import DeleteModal from '../../components/DeleteModal/DeleteModal'
import { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { ProjectOutlet } from '../ProjectPage/ProjectPageTypes'
import { arrayRemove, doc, updateDoc, writeBatch } from 'firebase/firestore'
import { db } from '../../config/firebase/firebase'
import { toast } from 'react-toastify'
import { toastOptions } from '../../config/toasts/toastOptions'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { changeProjects } from '../../redux/features/projects-slice/projects-slice'

import './SettingsPage.scss'

const SettingsPage = () => {
  const { currentProject } = useOutletContext<ProjectOutlet>()

  const [projectName, setProjectName] = useState<string>(currentProject.title)
  const [deleteModal, setDeleteModal] = useState<boolean>(false)

  const navigate = useNavigate()
  const projects = useAppSelector((state) => state.projects)
  const dispatch = useAppDispatch()

  const handleOpenDeleteModal = () => {
    setDeleteModal(true)
  }

  const handleCloseDeleteModal = () => {
    setDeleteModal(false)
  }

  const handleChangeProjectName = async () => {
    if (projectName === currentProject.title) return

    const projectRef = doc(db, 'projects', currentProject.id)

    const newProjects = projects.map((project) => {
      if (project.id === currentProject.id) {
        return {
          ...currentProject,
          title: projectName,
        }
      } else return project
    })

    try {
      await updateDoc(projectRef, {
        title: projectName,
      })
      dispatch(changeProjects(newProjects))
    } catch (error) {
      toast.error('Something went wrong', toastOptions)
    }
  }

  const handleDeleteProject = async () => {
    const newProjects = projects.filter(
      (project) => project.id !== currentProject.id
    )
    const projectRef = doc(db, 'projects', currentProject.id)
    const batch = writeBatch(db)

    currentProject.workers.forEach((worker) => {
      if (worker.role === 'Leader')
        batch.update(doc(db, 'users', worker.email), {
          ownProjects: arrayRemove(currentProject.id),
        })
      else {
        batch.update(doc(db, 'users', worker.email), {
          sharedProjects: arrayRemove(currentProject.id),
        })
      }
    })
    batch.delete(projectRef)

    try {
      await batch.commit()
      dispatch(changeProjects(newProjects))
      navigate('/home', { replace: true })
      handleCloseDeleteModal()
    } catch (error) {
      toast.error('Something went wrong', toastOptions)
    }
  }

  return (
    <div className='settings-page'>
      <h2>Settings:</h2>
      <div className='settings'>
        <div className='project-name'>
          <h3>Change project name</h3>
          <div className='input'>
            <TextField
              label='Project name'
              variant='outlined'
              type='text'
              value={projectName}
              onChange={(e) => setProjectName(e.target.value)}
            />
            <Button
              variant='contained'
              className='no-projects-button'
              onClick={handleChangeProjectName}
            >
              Update
            </Button>
          </div>
        </div>
        <div className='project-delete'>
          <h3>Delete project</h3>
          <Button
            variant='contained'
            className='delete'
            onClick={handleOpenDeleteModal}
          >
            Delete
          </Button>
        </div>
      </div>
      <DeleteModal
        isOpen={deleteModal}
        closeModal={handleCloseDeleteModal}
        onDelete={handleDeleteProject}
      />
    </div>
  )
}

export default SettingsPage
