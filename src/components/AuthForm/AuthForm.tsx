import { AuthFormProps } from './AuthFormTypes'

import './AuthForm.scss'

const AuthForm = ({ children }: AuthFormProps) => {
  return (
    <div className='auth-form-container'>
      <form autoComplete='off'>{children}</form>
    </div>
  )
}

export default AuthForm
