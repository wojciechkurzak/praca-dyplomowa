import { Button } from '@mui/material'
import { NoProjectsProps } from './NoProjectsTypes'

import './NoProjects.scss'

const NoProjects = ({ openModal }: NoProjectsProps) => {
  return (
    <div className='no-projects'>
      <h2>You have no projects</h2>
      <Button
        variant='contained'
        className='no-projects-button'
        onClick={openModal}
      >
        Create new project
      </Button>
    </div>
  )
}

export default NoProjects
