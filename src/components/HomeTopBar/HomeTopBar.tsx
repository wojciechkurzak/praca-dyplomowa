import UserProfile from '../UserProfile/UserProfile'
import { HomeTopBarProps } from './HomeTopBarTypes'

import './HomeTopBar.scss'

const HomeTopBar = ({ title }: HomeTopBarProps) => {
  return (
    <div className='home-top-bar'>
      <h1>{title}</h1>
      <UserProfile />
    </div>
  )
}

export default HomeTopBar
