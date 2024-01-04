import UserProfile from '../UserProfile/UserProfile'
import './HomeTopBar.scss'

const HomeTopBar = () => {
  return (
    <div className='home-top-bar'>
      <h1>Dashboard</h1>
      <UserProfile />
    </div>
  )
}

export default HomeTopBar
