import { useAppSelector } from '../../redux/hooks'
import { ProtectedRouteProps } from './ProtectedRouteTypes'
import Loading from '../Loading/Loading'

const ProtectedRoute = ({ component }: ProtectedRouteProps) => {
  const isAuth = useAppSelector((state) => state.auth.uid)

  return <>{isAuth ? component : <Loading />}</>
}

export default ProtectedRoute
