import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase/firebase'
import { useAppDispatch } from './redux/hooks'
import { changeAuthState } from './redux/features/auth-slice/auth-slice'
import { useNavigate } from 'react-router-dom'
import Loading from './components/Loading/Loading'
import { ToastContainer } from 'react-toastify'

import './App.scss'
import 'react-toastify/dist/ReactToastify.css'

const App = () => {
  const [pending, setPending] = useState(true)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          changeAuthState({
            uid: user.uid,
            username: user.displayName,
            email: user.email,
            imageUrl: user.photoURL,
          })
        )
        navigate('/home', { replace: true })
      } else {
        dispatch(
          changeAuthState({
            uid: null,
            username: null,
            email: null,
            imageUrl: null,
          })
        )
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
