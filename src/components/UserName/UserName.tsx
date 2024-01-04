import { UserNameProps } from './UserNameTypes'
import './UserName.scss'

const UserName = ({ username, size = 16, color = '#fff' }: UserNameProps) => {
  return (
    <div className='user-name'>
      <span style={{ fontSize: size, color: color }}>
        {username ? username : 'User'}
      </span>
    </div>
  )
}

export default UserName
