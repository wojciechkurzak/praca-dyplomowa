import { useState } from 'react'
import CreateProjectModal from '../../components/CreateProjectModal/CreateProjectModal'
import HomeTopBar from '../../components/HomeTopBar/HomeTopBar'
import NoProjects from '../../components/NoProjects/NoProjects'
import { useAppSelector } from '../../redux/hooks'
import ProjectList from '../../components/ProjectList/ProjectList'

import './HomePage.scss'

const HomePage = () => {
  const [createProjectModal, setCreateProjectModal] = useState<boolean>(false)

  const projects = useAppSelector((state) => state.projects)

  const handleOpenCreateProjectModal = () => {
    setCreateProjectModal(true)
  }

  const handleCloseCreateProjectModal = () => {
    setCreateProjectModal(false)
  }

  return (
    <main className='home-page'>
      <HomeTopBar title='Dashboard' />
      <section className='content'>
        {projects.ownProjects.length !== 0 ? (
          <ProjectList
            projects={projects.ownProjects}
            title='My projects'
            addProjects={true}
            openModal={handleOpenCreateProjectModal}
          />
        ) : (
          <NoProjects openModal={handleOpenCreateProjectModal} />
        )}
      </section>
      <CreateProjectModal
        isOpen={createProjectModal}
        closeModal={handleCloseCreateProjectModal}
      />
    </main>
  )
}

export default HomePage
