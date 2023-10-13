import { FaSignOutAlt } from 'react-icons/fa'
import { IoMdSettings } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase/firebase'
import { useAppSelector } from '../../redux/hooks'
import UserName from '../UserName/UserName'
import UserImage from '../UserImage/UserImage'
import UserEmail from '../UserEmail/UserEmail'
import './UserProfile.scss'

const UserProfile = () => {
  const user = useAppSelector((state) => state.auth)

  const navigate = useNavigate()

  const handleNavigateToSettings = (): void => {
    navigate('/settings')
  }

  const handleSignOut = async (): Promise<void> => {
    signOut(auth)
      .then(() => {
        navigate('/login', { replace: true })
      })
      .catch((error) => {
        console.log(error.code)
      })
  }

  return (
    <div className='user-profile'>
      <button>
        <UserName username={user.username} />
        <UserImage imageUrl={user.imageUrl} />
      </button>
      <div className='user-dropdown-settings'>
        <UserImage imageUrl={user.imageUrl} size={120} />
        <UserName username={user.username} size={24} />
        <UserEmail email={user.email} size={18} color='#666' />
        <ul>
          <li>
            <a onClick={handleNavigateToSettings}>
              <IoMdSettings size={22} /> Settings
            </a>
          </li>
          <li>
            <a onClick={handleSignOut}>
              <FaSignOutAlt color='#e00' size={22} /> Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default UserProfile
