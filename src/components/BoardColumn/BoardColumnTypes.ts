import { Task } from '../../interfaces/Project'
import { Column } from '../ScrumBoard/ScrumBoardTypes'

export type BoardColumnProps = {
  column: Column
  tasks: Task[]
}
