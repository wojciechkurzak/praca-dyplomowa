import { UserEmailType } from '../../types/user-email-type'

const UserEmail = ({ email, size, color }: UserEmailType) => {
  return (
    <div className='user-email'>
      <p style={{ fontSize: size, color: color }}>{email}</p>
    </div>
  )
}

export default UserEmail
