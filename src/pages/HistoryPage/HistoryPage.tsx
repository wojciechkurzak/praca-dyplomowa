import { useOutletContext } from 'react-router-dom'
import { ProjectOutlet } from '../ProjectPage/ProjectPageTypes'
import HistoryCard from '../../components/HistoryCard/HistoryCard'

import './HistoryPage.scss'

const HistoryPage = () => {
  const { currentProject } = useOutletContext<ProjectOutlet>()
  return (
    <div className='history-page'>
      <div className='title'>
        <h2>History:</h2>
      </div>
      <div className='sprints'>
        {currentProject.history.length !== 0 ? (
          currentProject.history.map((sprint, index) => (
            <HistoryCard sprint={sprint} key={index} />
          ))
        ) : (
          <span className='no-history'>No history</span>
        )}
      </div>
    </div>
  )
}

export default HistoryPage
