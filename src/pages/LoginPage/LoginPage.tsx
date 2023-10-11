import { useState } from 'react'
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
    console.log('Works!')
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
