import { AuthFormInputProps } from './AuthFormInputTypes'
import TextField from '@mui/material/TextField'

import './AuthFormInput.scss'

const AuthFormInput = ({
  label,
  type,
  value,
  onChange,
  errorMessage,
}: AuthFormInputProps) => {
  return (
    <div className='auth-form-input'>
      <TextField
        label={label}
        variant='standard'
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      {errorMessage && <span className='auth-error'>{errorMessage}</span>}
    </div>
  )
}

export default AuthFormInput
