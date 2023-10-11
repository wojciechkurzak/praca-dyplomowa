import { AuthNavigateType } from '../../types/auth-navigate-type'
import { useNavigate } from 'react-router-dom'
import './AuthNavigate.scss'

const AuthNavigate = ({ text, route }: AuthNavigateType) => {
  const navigate = useNavigate()

  const handleNavigate = (): void => {
    navigate(route)
  }

  return (
    <a onClick={handleNavigate} className='auth-navigate'>
      {text}
    </a>
  )
}

export default AuthNavigate