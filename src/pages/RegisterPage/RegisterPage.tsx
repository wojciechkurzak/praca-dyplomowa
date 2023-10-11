import { useState } from 'react'
import { auth } from '../../config/firebase/firebase'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import AuthFormButton from '../../components/AuthFormButton/AuthFormButton'
import AuthFormInput from '../../components/AuthFormInput/AuthFormInput'
import AuthForm from '../../components/AuthForm/AuthForm'
import AuthNavigate from '../../components/AuthNavigate/AuthNavigate'
import './RegisterPage.scss'

const RegisterPage = () => {
  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const handleRegister = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault()
    const emailRegex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g
    const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*\W).{8,}$/g

    const isFormValid =
      email.match(emailRegex) &&
      password.match(passwordRegex) &&
      confirmPassword === password

    if (!isFormValid) return

    createUserWithEmailAndPassword(auth, email, password).catch((error) => {
      console.log('Error code: ', error.code)
    })
  }

  return (
    <div className='register-page'>
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
        <AuthFormInput
          label='Confirm password'
          type='password'
          value={confirmPassword}
          onChange={setConfirmPassword}
        />
        <AuthNavigate text='Already have an account?' route='/login' />
        <AuthFormButton text='Sign up' onClick={handleRegister} />
      </AuthForm>
    </div>
  )
}

export default RegisterPage
