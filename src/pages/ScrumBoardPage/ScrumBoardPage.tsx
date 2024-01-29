import KanbanBoard from '../../components/BoardTest/KanbanBoard'
import ScrumBoard from '../../components/ScrumBoard/ScrumBoard'

import './ScrumBoardPage.scss'

const ScrumBoardPage = () => {
  return (
    <div className='scrum-board-page'>
      <h2>Scrum board:</h2>
      <ScrumBoard />
    </div>
  )
}

export default ScrumBoardPage
