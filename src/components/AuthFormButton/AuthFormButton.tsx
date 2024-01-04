import { AuthFormButtonProps } from './AuthFromButtonTypes'
import Button from '@mui/material/Button'

const AuthFormButton = ({ text, onClick }: AuthFormButtonProps) => {
  return (
    <>
      <Button
        variant='contained'
        type='submit'
        className='auth-form-button'
        onClick={onClick}
      >
        {text}
      </Button>
    </>
  )
}

export default AuthFormButton
