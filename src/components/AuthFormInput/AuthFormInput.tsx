import { AuthFormInputType } from './auth-form-input-type'
import './AuthFormInput.scss'

const AuthFormInput = ({
  label,
  type,
  value,
  onChange,
  errorMessage,
}: AuthFormInputType) => {
  return (
    <div className='auth-form-input'>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {errorMessage && <span className='error'>{errorMessage}</span>}
    </div>
  )
}

export default AuthFormInput
