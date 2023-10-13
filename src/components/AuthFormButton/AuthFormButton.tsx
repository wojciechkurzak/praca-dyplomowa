import { AuthFormButtonType } from './auth-form-button-type'
import './AuthFormButton.scss'

const AuthFormButton = ({ text, onClick }: AuthFormButtonType) => {
  return (
    <>
      <button type='submit' className='auth-form-button' onClick={onClick}>
        {text}
      </button>
    </>
  )
}

export default AuthFormButton
