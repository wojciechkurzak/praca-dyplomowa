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
  status: 'create' | 'running'
  title: string
  tasks: Task[]
  startAt: string | null
  endAt: string | null
}

export interface Project {
  id: string
  createdAt: string
  title: string
  description: string
  leader: string
  workers: Worker[]
  unassignedTasks: Task[]
  sprint: Sprint
}
