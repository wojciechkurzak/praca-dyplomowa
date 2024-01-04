import { Button } from '@mui/material'
import { useState } from 'react'
import './NoProjects.scss'

const NoProjects = () => {
  const [modal, setModal] = useState<boolean>(false)

  const handleOpenModal = () => {
    setModal(true)
  }

  const handleCloseModal = () => {
    setModal(false)
  }

  return (
    <div className='no-projects'>
      <h2>You have no projects</h2>
      <Button
        variant='contained'
        className='no-projects-button'
        onClick={handleOpenModal}
      >
        Create new project
      </Button>
    </div>
  )
}

export default NoProjects
