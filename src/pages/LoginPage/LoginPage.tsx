import { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase/firebase'
import AuthFormButton from '../../components/AuthFormButton/AuthFormButton'
import AuthFormInput from '../../components/AuthFormInput/AuthFormInput'
import AuthForm from '../../components/AuthForm/AuthForm'
import AuthNavigate from '../../components/AuthNavigate/AuthNavigate'
import './LoginPage.scss'
import 'react-toastify/dist/ReactToastify.css'

const LoginPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleLogin = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const isFormValid = email && password

    if (!isFormValid) {
      toast.error('Inputs cannot be empty', {
        position: 'top-center',
        autoClose: 5000,
        pauseOnHover: false,
        theme: 'dark',
      })
      return
    }

    signInWithEmailAndPassword(auth, email, password).catch(() => {
      toast.error('Wrong email or password', {
        position: 'top-center',
        autoClose: 5000,
        pauseOnHover: false,
        theme: 'dark',
      })
    })
  }

  return (
    <>
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
      <ToastContainer />
    </>
  )
}

export default LoginPage
