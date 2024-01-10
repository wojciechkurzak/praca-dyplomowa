import { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../../config/firebase/firebase'
import AuthFormButton from '../../components/AuthFormButton/AuthFormButton'
import AuthFormInput from '../../components/AuthFormInput/AuthFormInput'
import AuthForm from '../../components/AuthForm/AuthForm'
import AuthNavigate from '../../components/AuthNavigate/AuthNavigate'
import AuthFormName from '../../components/AuthFormName/AuthFormName'
import { toastOptions } from '../../config/toasts/toastOptions'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { changeUID } from '../../redux/features/auth-slice/auth-slice'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'

import './AuthPage.scss'

const LoginPage = () => {
  const [email, setEmail] = useState<string>('sex@sex.com')
  const [password, setPassword] = useState<string>('Test123#')

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (user.uid) navigate('/home', { replace: true })
  }, [])

  const handleLogin = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const isFormValid = email && password

    if (!isFormValid) {
      toast.error('Inputs cannot be empty', toastOptions)
      return
    }

    signInWithEmailAndPassword(auth, email, password)
      .then((user) => {
        dispatch(changeUID(user.user.uid))
        navigate('/home', { replace: true })
        toast.success('Signed in', toastOptions)
      })
      .catch(() => toast.error('Wrong email or password', toastOptions))
  }

  return !user.uid ? (
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
  ) : (
    <Loading />
  )
}

export default LoginPage
