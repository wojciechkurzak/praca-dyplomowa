import { useSortable } from '@dnd-kit/sortable'
import { BoardItemProps } from './BoardItemTypes'
import { CSS } from '@dnd-kit/utilities'

import './BoardItem.scss'

const BoardItem = ({ task }: BoardItemProps) => {
  const {
    setNodeRef,
    attributes,
    listeners,
    transition,
    isDragging,
    transform,
  } = useSortable({
    id: task.id,
    data: {
      type: 'Task',
      task,
    },
  })

  const style = {
    transition,
    transform: CSS.Translate.toString(transform),
  }

  if (isDragging) {
    return (
      <div ref={setNodeRef} style={style} className='board-item item-overlay' />
    )
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className='board-item'
    >
      <p className='title'>{task.title}</p>
      <p className='assignment'>{task.assignment}</p>
    </div>
  )
}

export default BoardItem
