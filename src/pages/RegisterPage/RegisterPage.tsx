import { useEffect, useState } from 'react'
import { auth, db } from '../../config/firebase/firebase'
import { doc, setDoc } from 'firebase/firestore'
import {
  UserCredential,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { toast } from 'react-toastify'
import AuthFormButton from '../../components/AuthFormButton/AuthFormButton'
import AuthFormInput from '../../components/AuthFormInput/AuthFormInput'
import AuthForm from '../../components/AuthForm/AuthForm'
import AuthNavigate from '../../components/AuthNavigate/AuthNavigate'
import AuthFormName from '../../components/AuthFormName/AuthFormName'
import { toastOptions } from '../../config/toasts/toastOptions'
import { RegisterErrors } from './RegisterPageTypes'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import {
  changeUID,
  changeUsername,
} from '../../redux/features/auth-slice/auth-slice'
import { useNavigate } from 'react-router-dom'
import Loading from '../../components/Loading/Loading'

import '../LoginPage/AuthPage.scss'

const RegisterPage = () => {
  const [email, setEmail] = useState<string>('test@test.com')
  const [username, setUsername] = useState<string>('TestUser')
  const [password, setPassword] = useState<string>('Test123#')
  const [confirmPassword, setConfirmPassword] = useState<string>('Test123#')
  const [errors, setErrors] = useState<RegisterErrors>({
    email: false,
    username: false,
    password: false,
    confirmPassword: false,
  })

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const user = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (user.uid) navigate('/home', { replace: true })
  }, [])

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
  const usernameRegex = /^[a-zA-Z0-9_-]{3,16}$/g
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/g

  const handleRegister = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()

    setErrors({
      email: !email.match(emailRegex),
      username: !username.match(usernameRegex),
      password: !password.match(passwordRegex),
      confirmPassword: confirmPassword !== password || confirmPassword === '',
    })

    if (!email || !username || !password || !confirmPassword) {
      toast.error('Inputs cannot be empty', toastOptions)
      return
    }

    const isFormValid =
      email.match(emailRegex) &&
      username.match(usernameRegex) &&
      password.match(passwordRegex) &&
      confirmPassword === password

    if (!isFormValid) return

    createUserWithEmailAndPassword(auth, email, password)
      .then((user: UserCredential) => {
        dispatch(changeUID(user.user.uid))
        updateProfile(user.user, {
          displayName: username,
        }).then(() => dispatch(changeUsername(username)))
      })
      .then(() =>
        setDoc(doc(db, 'users', email), {
          username: username,
          email: email,
          ownProjects: [],
          sharedProjects: [],
        })
      )
      .then(() => {
        navigate('/home', { replace: true })
        toast.success('Account created', toastOptions)
      })
      .catch(() => toast.error('Something went wrong', toastOptions))
  }

  return !user.uid ? (
    <div className='auth-page'>
      <AuthForm>
        <AuthFormName text='Sign up' />
        <div className='inputs-container'>
          <AuthFormInput
            label='Email'
            type='email'
            value={email}
            onChange={setEmail}
            errorMessage={errors.email ? 'Invalid email' : null}
          />
          <AuthFormInput
            label='Username'
            type='text'
            value={username}
            onChange={setUsername}
            errorMessage={errors.username ? '3-16 characters' : null}
          />
          <AuthFormInput
            label='Password'
            type='password'
            value={password}
            onChange={setPassword}
            errorMessage={
              errors.password
                ? 'Minimum 8 characters,  1 uppercase letter, 1 number, 1 special character'
                : null
            }
          />
          <AuthFormInput
            label='Confirm password'
            type='password'
            value={confirmPassword}
            onChange={setConfirmPassword}
            errorMessage={
              errors.confirmPassword ? "Passwords don't match" : null
            }
          />
        </div>
        <AuthNavigate text='Already have an account?' route='/login' />
        <AuthFormButton text='Sign up' onClick={handleRegister} />
      </AuthForm>
    </div>
  ) : (
    <Loading />
  )
}

export default RegisterPage
