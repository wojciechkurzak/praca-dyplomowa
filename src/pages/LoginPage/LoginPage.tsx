import { useState } from 'react'
import { toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase/firebase'
import AuthFormButton from '../../components/AuthFormButton/AuthFormButton'
import AuthFormInput from '../../components/AuthFormInput/AuthFormInput'
import AuthForm from '../../components/AuthForm/AuthForm'
import AuthNavigate from '../../components/AuthNavigate/AuthNavigate'
import AuthFormName from '../../components/AuthFormName/AuthFormName'
import { toastOptions } from '../../config/toasts/toastOptions'

import './AuthPage.scss'

const LoginPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const isFormValid = email && password

    if (!isFormValid) {
      toast.error('Inputs cannot be empty', toastOptions)
      return
    }

    signInWithEmailAndPassword(auth, email, password)
      .then(() => toast.success('Signed in', toastOptions))
      .catch(() => toast.error('Wrong email or password', toastOptions))
  }

  return (
    <div className='auth-page'>
      <AuthForm>
        <AuthFormName text='Sign in' />
        <div className='inputs-container'>
          <AuthFormInput
            label='Email'
            type='email'
            value={email}
            onChange={setEmail}
          />
          <AuthFormInput
            label='Password'
            type='password'
            value={password}
            onChange={setPassword}
          />
        </div>
        <AuthNavigate text='Create a new account' route='/register' />
        <AuthFormButton text='Sign in' onClick={handleLogin} />
      </AuthForm>
    </div>
  )
}

export default LoginPage
