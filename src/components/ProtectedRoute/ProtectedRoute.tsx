import { useAppSelector } from '../../redux/hooks'
import { ProtectedRouteType } from '../../types/protected-route-type'
import { useNavigate } from 'react-router-dom'
import { useEffect } from 'react'

const ProtectedRoute = ({ component }: ProtectedRouteType) => {
  const navigate = useNavigate()
  const isAuth = useAppSelector((state) => state.auth.value)

  useEffect(() => {
    !isAuth && navigate('/login')
  }, [])

  return <>{component}</>
}

export default ProtectedRoute
