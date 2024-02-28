import UserProfile from '../UserProfile/UserProfile'
import { HomeTopBarProps } from './HomeTopBarTypes'
import { IoMenu } from 'react-icons/io5'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { changeProjectNavigationState } from '../../redux/features/project-navigation-slice/project-navigation-slice'
import { useLocation } from 'react-router-dom'

import './HomeTopBar.scss'

const HomeTopBar = ({ title }: HomeTopBarProps) => {
  const visible = useAppSelector((state) => state.projectNavigation)
  const dispatch = useAppDispatch()
  const location = useLocation()

  const handleToggleNavigationVisible = () => {
    dispatch(changeProjectNavigationState(!visible))
  }

  return (
    <div className='home-top-bar'>
      <div className='title'>
        {location.pathname !== '/home' && (
          <button
            onClick={handleToggleNavigationVisible}
            className={visible ? 'open' : ''}
          >
            <IoMenu size={28} color='#fff' />
          </button>
        )}

        <h1>{title}</h1>
      </div>
      <UserProfile />
    </div>
  )
}

export default HomeTopBar
