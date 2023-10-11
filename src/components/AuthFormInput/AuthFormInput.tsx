import { AuthFormInputType } from '../../types/auth-form-input-type'
import './AuthFormInput.scss'

const AuthFormInput = ({ label, type, value, onChange }: AuthFormInputType) => {
  return (
    <div className='auth-form-input'>
      <label>{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  )
}

export default AuthFormInput
