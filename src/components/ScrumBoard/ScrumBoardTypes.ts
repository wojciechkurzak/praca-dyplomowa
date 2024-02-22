import { Task } from '../../interfaces/Project'

export type ScrumBoardProps = {
  tasks: Task[]
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>
}

export type Column = {
  id: string
  title: string
}
