import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './config/firebase/firebase'
import { useAppDispatch, useAppSelector } from './redux/hooks'
import { changeAuthState } from './redux/features/auth-slice/auth-slice'
import Loading from './components/Loading/Loading'
import { ToastContainer } from 'react-toastify'
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from 'firebase/firestore'
import { changeProjects } from './redux/features/projects-slice/projects-slice'
import { Project } from './interfaces/Project'

import './App.scss'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [pending, setPending] = useState(true)
  const navigate = useNavigate()
  const location = useLocation()

  const dispatch = useAppDispatch()
  const projects = useAppSelector((state) => state.projects)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const response = await getDoc(doc(db, 'users', user.email!))
        const projectsRes = response.data()
        dispatch(
          changeAuthState({
            uid: user.uid,
            username: user.displayName,
            email: user.email,
            ownProjects: projectsRes!.ownProjects,
            sharedProjects: projectsRes!.sharedProjects,
          })
        )
        if (projects.length !== 0) return
        const projectsRef = collection(db, 'projects')
        const projectsID = [
          ...projectsRes!.ownProjects,
          ...projectsRes!.sharedProjects,
        ]
        if (projectsID.length === 0) {
          dispatch(changeProjects([]))
        } else {
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
        }
      } else {
        dispatch(
          changeAuthState({
            uid: null,
            username: null,
            email: null,
            ownProjects: [],
            sharedProjects: [],
          })
        )
        dispatch(changeProjects([]))
      }
      setPending(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  useEffect(() => {
    if (!pending && !auth) navigate('/login', { replace: true })
    else if (!pending && auth && location.pathname === '/')
      navigate('/home', { replace: true })
  }, [pending])

  return (
    <div className='app'>
      {!pending ? <Outlet /> : <Loading />}
      <ToastContainer />
    </div>
  )
}

export default App
