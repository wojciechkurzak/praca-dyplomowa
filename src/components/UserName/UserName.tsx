import { UserNameType } from '../../types/user-name-type'
import './UserName.scss'

const UserName = ({ username, size = 16, color = '#fff' }: UserNameType) => {
  return (
    <div className='user-name'>
      <span style={{ fontSize: size, color: color }}>
        {username ? username : 'User'}
      </span>
    </div>
  )
}

export default UserName
