import { Project } from '../../interfaces/Project'

export type ProjectListProps = {
  projects: Project[]
  title: string
  addProjects?: boolean
  openModal?: () => void
}
