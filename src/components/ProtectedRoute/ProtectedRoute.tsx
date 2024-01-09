import { useAppSelector } from '../../redux/hooks'
import { ProtectedRouteProps } from './ProtectedRouteTypes'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import Loading from '../Loading/Loading'

const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
  const navigate = useNavigate()
  const isAuth = useAppSelector((state) => state.auth.uid)

  useEffect(() => {
    !isAuth && navigate('/login', { replace: true })
  }, [])

  return <>{isAuth ? component : <Loading />}</>
}

export default ProtectedRoute
