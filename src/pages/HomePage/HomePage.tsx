import { useState } from 'react'
import CreateProjectModal from '../../components/CreateProjectModal/CreateProjectModal'
import HomeTopBar from '../../components/HomeTopBar/HomeTopBar'
import NoProjects from '../../components/NoProjects/NoProjects'

import './HomePage.scss'

const HomePage = () => {
  const [createProjectModal, setCreateProjectModal] = useState<boolean>(true)

  const handleOpenCreateProjectModal = () => {
    setCreateProjectModal(true)
  }

  const handleCloseCreateProjectModal = () => {
    setCreateProjectModal(false)
  }
  return (
    <main className='home-page'>
      <HomeTopBar />
      <NoProjects openModal={handleOpenCreateProjectModal} />
      <CreateProjectModal
        isOpen={createProjectModal}
        closeModal={handleCloseCreateProjectModal}
      />
    </main>
  )
}

export default HomePage
