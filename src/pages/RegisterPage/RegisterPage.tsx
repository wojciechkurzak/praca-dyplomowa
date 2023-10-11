import { useState } from 'react'
import { auth } from '../../config/firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify'
import AuthFormButton from '../../components/AuthFormButton/AuthFormButton'
import AuthFormInput from '../../components/AuthFormInput/AuthFormInput'
import AuthForm from '../../components/AuthForm/AuthForm'
import AuthNavigate from '../../components/AuthNavigate/AuthNavigate'
import './RegisterPage.scss'
import 'react-toastify/dist/ReactToastify.css'

const RegisterPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    confirmPassword: false,
  })

  const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
  const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/g

  const handleRegister = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()

    setErrors({
      email: !email.match(emailRegex),
      password: !password.match(passwordRegex),
      confirmPassword: confirmPassword !== password || confirmPassword === '',
    })

    if (!email || !password || !confirmPassword) {
      toast.error('Inputs cannot be empty', {
        position: 'top-center',
        autoClose: 5000,
        pauseOnHover: false,
        theme: 'dark',
      })
      return
    }

    const isFormValid =
      email.match(emailRegex) &&
      password.match(passwordRegex) &&
      confirmPassword === password

    if (!isFormValid) return

    createUserWithEmailAndPassword(auth, email, password).catch(() => {
      toast.error('Something went wrong', {
        position: 'top-center',
        autoClose: 5000,
        pauseOnHover: false,
        theme: 'dark',
      })
    })
  }

  return (
    <>
      <div className='register-page'>
        <AuthForm>
          <AuthFormInput
            label='Email'
            type='email'
            value={email}
            onChange={setEmail}
            errorMessage={errors.email ? 'Invalid email' : null}
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
          <AuthNavigate text='Already have an account?' route='/login' />
          <AuthFormButton text='Sign up' onClick={handleRegister} />
        </AuthForm>
      </div>
      <ToastContainer />
    </>
  )
}

export default RegisterPage
