import { useOutletContext } from 'react-router-dom'
import { ProjectOutlet } from '../ProjectPage/ProjectPageTypes'
import WorkerCard from '../../components/WorkerCard/WorkerCard'
import { Button } from '@mui/material'
import { IoMdAdd } from 'react-icons/io'
import AddWorkerModal from '../../components/AddWorkerModal/AddWorkerModal'
import { useState } from 'react'
import { sortByRole } from '../../utils/SortByRole'
import { useAppSelector } from '../../redux/hooks'

import './ProjectUsers.scss'

const ProjectUsers = () => {
  const [workerModal, setWorkerModal] = useState<boolean>(false)

  const { currentProject } = useOutletContext<ProjectOutlet>()
  const auth = useAppSelector((state) => state.auth)

  const workers = [...currentProject.workers].sort(sortByRole)

  const handleOpenWorkerModal = () => {
    setWorkerModal(true)
  }

  const handleCloseWorkerModal = () => {
    setWorkerModal(false)
  }

  return (
    <section className='project-users'>
      <div className='title'>
        <h2>Users:</h2>
        {currentProject.leader === auth.email && (
          <Button
            variant='contained'
            className='no-projects-button'
            onClick={handleOpenWorkerModal}
          >
            <IoMdAdd size={22} />
          </Button>
        )}
      </div>
      <div className='users'>
        {workers.map((worker) => (
          <WorkerCard worker={worker} key={worker.email} />
        ))}
      </div>
      <AddWorkerModal
        isOpen={workerModal}
        closeModal={handleCloseWorkerModal}
      />
    </section>
  )
}

export default ProjectUsers
