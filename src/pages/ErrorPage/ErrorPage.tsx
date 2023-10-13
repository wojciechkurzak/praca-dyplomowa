import { useNavigate } from 'react-router-dom'
import './ErrorPage.scss'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className='error-page'>
      <p>404</p>
      <p>Not found</p>
      <button onClick={() => navigate('/home', { replace: true })}>
        Back to Home
      </button>
    </div>
  )
}

export default ErrorPage
