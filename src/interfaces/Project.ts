export interface Worker {
  email: string
  role: string
  username?: string
}

export interface Task {
  id: string
  title: string
  status: string
  assignment: string
  isSprint: boolean
}

export interface Sprint {
  isRunning: boolean
  title: string
  startAt: string | null
  endAt: string | null
}

export interface History {
  title: string
  startAt: string | null
  endAt: string | null
  tasks: Task[]
}

export interface Project {
  id: string
  createdAt: string
  title: string
  description: string
  leader: string
  workers: Worker[]
  tasks: Task[]
  sprint: Sprint
  history: History[]
}
