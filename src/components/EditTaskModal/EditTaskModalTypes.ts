import { Task } from '../../interfaces/Project'

export type EditTaskModalProps = {
  isOpen: boolean
  closeModal: () => void
  task: Task
}
