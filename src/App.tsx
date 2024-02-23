import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './config/firebase/firebase'
import { useAppDispatch } from './redux/hooks'
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

  const dispatch = useAppDispatch()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const response = await getDoc(doc(db, 'users', user.email!))
        const projects = response.data()
        dispatch(
          changeAuthState({
            uid: user.uid,
            username: user.displayName,
            email: user.email,
            ownProjects: projects!.ownProjects,
            sharedProjects: projects!.sharedProjects,
          })
        )
        const projectsRef = collection(db, 'projects')
        const projectsID = [
          ...projects!.ownProjects,
          ...projects!.sharedProjects,
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

  return (
    <div className='app'>
      {!pending ? <Outlet /> : <Loading />}
      <ToastContainer />
    </div>
  )
}

export default App
