import { Worker } from '../interfaces/Project'

export const sortByRole = (a: Worker, b: Worker) => {
  if (a.role < b.role) {
    return -1
  }
  if (a.role > b.role) {
    return 1
  }
  return 0
}
