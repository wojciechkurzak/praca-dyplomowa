import {
  Outlet,
  ScrollRestoration,
  useLocation,
  useNavigate,
} from 'react-router-dom'
import { useEffect, useState } from 'react'
import HomeTopBar from '../../components/HomeTopBar/HomeTopBar'
import ProjectNavigation from '../../components/ProjectNavigation/ProjectNavigation'
import { Project, Worker } from '../../interfaces/Project'
import { useAppSelector } from '../../redux/hooks'
import Loading from '../../components/Loading/Loading'
import { db } from '../../config/firebase/firebase'
import { collection, getDocs, query, where } from 'firebase/firestore'

import './ProjectPage.scss'

const ProjectPage = () => {
  const [project, setProject] = useState<Project | null>(null)
  const { state } = useLocation()
  const navigate = useNavigate()

  const projects = useAppSelector((state) => state.projects)

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
          imageUrl: doc.data().imageUrl,
          role: worker!.role,
        },
      ]
    })
    const newProject = {
      ...project,
      workers: usersResponse,
    }
    setProject(newProject)
  }

  useEffect(() => {
    if (!state) navigate('/home', { replace: true })
    else {
      const currentProject = projects.find(
        (project) => project.id === state.id
      ) as Project
      handleGetUsers(currentProject)
    }
  }, [projects])

  return project ? (
    <div className='project-page'>
      <HomeTopBar title={project.title} />
      <div className='project-main'>
        <ProjectNavigation project={project} />
        <main>
          <Outlet context={{ currentProject: project }} />
          <ScrollRestoration />
        </main>
      </div>
    </div>
  ) : (
    <Loading />
  )
}

export default ProjectPage
