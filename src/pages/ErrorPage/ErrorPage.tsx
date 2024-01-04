import { useNavigate } from 'react-router-dom'
import Button from '@mui/material/Button'

import './ErrorPage.scss'

const ErrorPage = () => {
  const navigate = useNavigate()

  return (
    <div className='error-page'>
      <div className='text'>
        <p>404</p>
        <p>Not found</p>
      </div>
      <Button onClick={() => navigate('/home', { replace: true })}>
        Back to Home
      </Button>
    </div>
  )
}

export default ErrorPage
