import { useState } from 'react'
import { FaSignOutAlt } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase/firebase'
import { useAppSelector } from '../../redux/hooks'
import UserName from '../UserName/UserName'
import UserEmail from '../UserEmail/UserEmail'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

import './UserProfile.scss'

const UserProfile = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => {
    setAnchorEl(null)
  }

  const user = useAppSelector((state) => state.auth)

  const navigate = useNavigate()

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
      <button onClick={handleClick} className={open ? 'open' : ''}>
        <UserName username={user.username} />
      </button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <UserName username={user.username} size={24} />
        <UserEmail email={user.email} size={18} color='#666' />
        <MenuItem>
          <a onClick={handleSignOut}>
            <FaSignOutAlt color='#e00' size={22} /> Sign out
          </a>
        </MenuItem>
      </Menu>
    </div>
  )
}

export default UserProfile
