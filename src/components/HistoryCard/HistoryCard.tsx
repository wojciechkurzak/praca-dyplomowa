import { HistoryCardProps } from './HistoryCardTypes'

import './HistoryCard.scss'

const HistoryCard = ({ sprint }: HistoryCardProps) => {
  return (
    <div className='history-card'>
      <div className='text-upper'>
        <h3>{sprint.title}</h3>
        <span>{`${sprint.startAt} - ${sprint.endAt}`}</span>
      </div>
      <div className='sprint'>
        {sprint.tasks.length !== 0 ? (
          sprint.tasks.map((task) => (
            <div className='tasks' key={task.id}>
              <span>{task.title}</span>
              <span>{task.assignment}</span>
            </div>
          ))
        ) : (
          <div className='no-tasks'>
            <span>No finished tasks</span>
          </div>
        )}
      </div>
    </div>
  )
}

export default HistoryCard
