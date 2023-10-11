import { useState } from 'react'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase/firebase'
import AuthFormButton from '../../components/AuthFormButton/AuthFormButton'
import AuthFormInput from '../../components/AuthFormInput/AuthFormInput'
import AuthForm from '../../components/AuthForm/AuthForm'
import AuthNavigate from '../../components/AuthNavigate/AuthNavigate'
import './LoginPage.scss'

const LoginPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const isFormValid = email && password

    if (!isFormValid) return

    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      console.log('Error code: ', error.code)
    })
  }

  return (
    <div className='login-page'>
      <AuthForm>
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
        <AuthNavigate text='Create a new account' route='/register' />
        <AuthFormButton text='Sign in' onClick={handleLogin} />
      </AuthForm>
    </div>
  )
}

export default LoginPage
