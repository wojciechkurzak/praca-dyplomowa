import {
  SortableContext,
  rectSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable'
import { useMemo } from 'react'
import BoardItem from '../BoardItem/BoardItem'
import { BoardColumnProps } from './BoardColumnTypes'
import { useAppSelector } from '../../redux/hooks'
import { useOutletContext } from 'react-router-dom'
import { ProjectOutlet } from '../../pages/ProjectPage/ProjectPageTypes'

import './BoardColumn.scss'

const BoardColumn = ({ column, tasks }: BoardColumnProps) => {
  const auth = useAppSelector((state) => state.auth)
  const { currentProject } = useOutletContext<ProjectOutlet>()

  const tasksIds = useMemo(() => {
    return tasks.map((task) => task.id)
  }, [tasks])

  const { setNodeRef } = useSortable({
    id: column.id,
    data: {
      type: 'Column',
      column,
    },
  })

  const sprintTasks = tasks.filter((task) => {
    if (task.isSprint && auth.email === currentProject.leader) return task
    else if (task.isSprint && task.assignment === auth.email) return task
  })

  return (
    <div ref={setNodeRef} className='board-column'>
      <h3>{column.title}</h3>
      <div className='board-task-container'>
        <SortableContext items={tasksIds} strategy={rectSortingStrategy}>
          {sprintTasks.map((task) => (
            <BoardItem key={task.id} task={task} />
          ))}
        </SortableContext>
      </div>
    </div>
  )
}

export default BoardColumn
