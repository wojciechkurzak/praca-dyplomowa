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
  const auth = useAppSelector((state) => state.auth)

  const ownProjects = projects.filter((project) =>
    auth.ownProjects.includes(project.id)
  )
  const sharedProjects = projects.filter((project) =>
    auth.sharedProjects.includes(project.id)
  )

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
        {projects.length !== 0 ? (
          <>
            <ProjectList
              projects={ownProjects}
              title='My projects'
              addProjects={true}
              openModal={handleOpenCreateProjectModal}
            />
            {sharedProjects.length !== 0 && (
              <ProjectList
                projects={sharedProjects}
                title='Shared projects'
                addProjects={false}
              />
            )}
          </>
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
