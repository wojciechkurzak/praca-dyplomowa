import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth, db } from './config/firebase/firebase'
import { useAppDispatch } from './redux/hooks'
import { changeAuthState } from './redux/features/auth-slice/auth-slice'
import Loading from './components/Loading/Loading'
import { ToastContainer } from 'react-toastify'
import { doc, getDoc } from 'firebase/firestore'
import { clearProjects } from './redux/features/projects-slice/projects-slice'

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
            imageUrl: user.photoURL,
            ownProjects: projects!.ownProjects,
            sharedProjects: projects!.sharedProjects,
          })
        )
      } else {
        dispatch(
          changeAuthState({
            uid: null,
            username: null,
            email: null,
            imageUrl: null,
            ownProjects: [],
            sharedProjects: [],
          })
        )
        dispatch(clearProjects())
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
