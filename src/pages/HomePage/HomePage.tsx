import { useEffect, useState } from 'react'
import CreateProjectModal from '../../components/CreateProjectModal/CreateProjectModal'
import HomeTopBar from '../../components/HomeTopBar/HomeTopBar'
import NoProjects from '../../components/NoProjects/NoProjects'
import { db } from '../../config/firebase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { Project } from '../../interfaces/Project'
import ProjectList from '../../components/ProjectList/ProjectList'
import Loading from '../../components/Loading/Loading'
import { changeOwnProjects } from '../../redux/features/projects-slice/projects-slice'

import './HomePage.scss'

const HomePage = () => {
  const [pending, setPending] = useState<boolean>(true)
  const [createProjectModal, setCreateProjectModal] = useState<boolean>(false)

  const user = useAppSelector((state) => state.auth)
  const projects = useAppSelector((state) => state.projects)
  const dispatch = useAppDispatch()

  const handleGetProjectsData = async () => {
    if (user.ownProjects.length === 0) {
      setPending(false)
      return
    }
    const projectsRef = collection(db, 'projects')
    const q = query(projectsRef, where('__name__', 'in', user.ownProjects))
    const querySnapshot = await getDocs(q)
    let projectsResponse: Project[] = []
    querySnapshot.forEach((doc) => {
      projectsResponse = [
        ...projectsResponse,
        {
          ...(doc.data() as Project),
          id: doc.id,
        },
      ]
    })
    dispatch(changeOwnProjects(projectsResponse))
    setPending(false)
  }

  useEffect(() => {
    if (user.email! !== null) handleGetProjectsData()
  }, [user])

  const handleOpenCreateProjectModal = () => {
    setCreateProjectModal(true)
  }

  const handleCloseCreateProjectModal = () => {
    setCreateProjectModal(false)
  }

  return !pending ? (
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
  ) : (
    <Loading />
  )
}

export default HomePage
