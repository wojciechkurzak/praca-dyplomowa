import { useEffect, useState } from 'react'
import CreateProjectModal from '../../components/CreateProjectModal/CreateProjectModal'
import HomeTopBar from '../../components/HomeTopBar/HomeTopBar'
import NoProjects from '../../components/NoProjects/NoProjects'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import ProjectList from '../../components/ProjectList/ProjectList'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../config/firebase/firebase'
import { changeProjects } from '../../redux/features/projects-slice/projects-slice'
import { Project } from '../../interfaces/Project'
import Loading from '../../components/Loading/Loading'

import './HomePage.scss'

const HomePage = () => {
  const user = useAppSelector((state) => state.auth)

  if (!user.email) return <Loading />
  else return <HomeData />
}

const HomeData = () => {
  const [createProjectModal, setCreateProjectModal] = useState<boolean>(false)
  const [pending, setPending] = useState<boolean>(true)

  const projects = useAppSelector((state) => state.projects)
  const user = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()

  const ownProjects = projects.filter((project) =>
    user.ownProjects.includes(project.id)
  )
  const sharedProjects = projects.filter((project) =>
    user.sharedProjects.includes(project.id)
  )

  const handleOpenCreateProjectModal = () => {
    setCreateProjectModal(true)
  }

  const handleCloseCreateProjectModal = () => {
    setCreateProjectModal(false)
  }

  const handleGetProjects = async () => {
    const projectsRef = collection(db, 'projects')
    const projectsID = [...user.ownProjects, ...user.sharedProjects]
    if (projectsID.length === 0) {
      dispatch(changeProjects([]))
      setPending(false)
      return
    }
    const q = query(projectsRef, where('__name__', 'in', projectsID))
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
    dispatch(changeProjects(projectsResponse))
    setPending(false)
  }

  useEffect(() => {
    handleGetProjects()
  }, [])

  return !pending ? (
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
  ) : (
    <Loading />
  )
}

export default HomePage
