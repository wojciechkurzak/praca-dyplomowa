import HomeTopBar from '../../components/HomeTopBar/HomeTopBar'
import NoProjects from '../../components/NoProjects/NoProjects'
import './HomePage.scss'

const HomePage = () => {
  return (
    <main className='home-page'>
      <HomeTopBar />
      <NoProjects />
    </main>
  )
}

export default HomePage
