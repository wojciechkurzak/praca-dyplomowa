import { AuthFormType } from '../../types/auth-form-type'
import './AuthForm.scss'

const AuthForm = ({ children }: AuthFormType) => {
  return (
    <div className='login-form-container'>
      <form>{children}</form>
    </div>
  )
}

export default AuthForm
