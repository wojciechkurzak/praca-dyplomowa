import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import HomeTopBar from '../../components/HomeTopBar/HomeTopBar'
import ProjectNavigation from '../../components/ProjectNavigation/ProjectNavigation'
import { Project, Worker } from '../../interfaces/Project'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import Loading from '../../components/Loading/Loading'
import { db } from '../../config/firebase/firebase'
import {
  collection,
  doc,
  getDocs,
  onSnapshot,
  query,
  where,
} from 'firebase/firestore'
import ChatBox from '../../components/ChatBox/ChatBox'
import { changeProjects } from '../../redux/features/projects-slice/projects-slice'

import './ProjectPage.scss'

const ProjectPage = () => {
  const { state } = useLocation()
  const navigate = useNavigate()

  useEffect(() => {
    if (!state) navigate('/home', { replace: true })
  }, [])

  if (!state) return <Loading />
  else return <ProjectData />
}

const ProjectData = () => {
  const [pending, setPending] = useState<boolean>(true)
  const { state } = useLocation()

  const projects = useAppSelector((state) => state.projects)
  const dispatch = useAppDispatch()

  const currentProject = projects.find(
    (project) => project.id === state.id
  ) as Project

  const handleGetUsers = async (project: Project) => {
    const usersEmail = project.workers.map((worker) => worker.email)

    const usersRef = collection(db, 'users')
    const q = query(usersRef, where('__name__', 'in', usersEmail))
    const querySnapshot = await getDocs(q)
    let usersResponse: Worker[] = []
    querySnapshot.forEach((doc) => {
      const worker = project.workers.find(
        (worker: Worker) => worker.email === doc.data().email
      )
      usersResponse = [
        ...usersResponse,
        {
          email: doc.data().email,
          username: doc.data().username,
          role: worker!.role,
        },
      ]
    })
    return usersResponse
  }

  useEffect(() => {
    const unsubscribe = onSnapshot(
      doc(db, 'projects', currentProject.id),
      async (doc) => {
        const workers = await handleGetUsers(currentProject)
        const newProjects = projects.map(
          (project) =>
            project.id === currentProject.id && {
              ...doc.data(),
              workers: workers,
            }
        )
        dispatch(changeProjects(newProjects as Project[]))
        setPending(false)
      }
    )
    return () => {
      unsubscribe()
    }
  }, [])

  return !pending ? (
    <div className='project-page'>
      <HomeTopBar title={currentProject.title} />
      <div className='project-main'>
        <ProjectNavigation project={currentProject} />
        <main>
          <Outlet context={{ currentProject: currentProject }} />
        </main>
      </div>
      <ChatBox project={currentProject} />
    </div>
  ) : (
    <Loading />
  )
}

export default ProjectPage
