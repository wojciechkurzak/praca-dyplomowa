import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectsState } from './projects-slice-types'
import { Project } from '../../../interfaces/Project'

const initialState: ProjectsState = []

const projectsSlice = createSlice({
  name: 'projects-state',
  initialState,
  reducers: {
    changeProjects(state, action: PayloadAction<Project[]>) {
      return [...action.payload]
    },
    addProject(state, action: PayloadAction<Project>) {
      state = [...state, action.payload]
    },
  },
})

export const { changeProjects, addProject } = projectsSlice.actions
export default projectsSlice.reducer
