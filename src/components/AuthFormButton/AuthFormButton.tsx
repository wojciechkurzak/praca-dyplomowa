import { AuthFormButtonType } from './AuthFromButtonTypes'
import Button from '@mui/material/Button'

const AuthFormButton = ({ text, onClick }: AuthFormButtonType) => {
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
