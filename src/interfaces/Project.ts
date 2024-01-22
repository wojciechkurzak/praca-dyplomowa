export interface Worker {
  email: string
  role: string
  username: string
  imageUrl: string
}

export interface Task {
  id: string
  title: string
  status: string
  assignment: string | null
}

export interface Sprint {
  title: string
  tasks: Task[]
  startAt: string
  endAt: string
}

export interface Project {
  id: string
  createdAt: string
  title: string
  description: string
  leader: string
  workers: Worker[]
  unassignedTasks: Task[]
  sprint: Sprint | null
}
