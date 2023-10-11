import { useEffect, useState } from 'react'
import { Outlet } from 'react-router-dom'
import { onAuthStateChanged } from 'firebase/auth'
import { auth } from './config/firebase/firebase'
import { useAppDispatch } from './redux/hooks'
import { changeAuthState } from './redux/features/auth-slice/auth-slice'
import { useNavigate } from 'react-router-dom'
import './App.scss'

const App = () => {
  const [pending, setPending] = useState(true)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(changeAuthState(user.uid))
        navigate('/home', { replace: true })
      } else {
        dispatch(changeAuthState(null))
      }
      setPending(false)
    })

    return () => {
      unsubscribe()
    }
  }, [])

  return (
    <div className='app'>{!pending ? <Outlet /> : <div>loading...</div>}</div>
  )
}

export default App
