type Worker = {
  email: string
  role: string
}

export interface Project {
  id: string
  createdAt: string
  title: string
  description: string
  leader: string
  workers: Worker[]
}
