import { AuthFormNameProps } from './AuthFormNameTypes'
import './AuthFormName.scss'

const AuthFormName = ({ text }: AuthFormNameProps) => {
  return (
    <div className='auth-form-name'>
      <h1>{text}</h1>
    </div>
  )
}

export default AuthFormName
