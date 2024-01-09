import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectsState } from './projects-slice-types'
import { Project } from '../../../interfaces/Project'

const initialState: ProjectsState = {
  ownProjects: [],
  sharedProjects: [],
}

const projectsSlice = createSlice({
  name: 'projects-state',
  initialState,
  reducers: {
    changeOwnProjects(state, action: PayloadAction<Project[]>) {
      state.ownProjects = action.payload
    },
    changeSharedProjects(state, action: PayloadAction<Project[]>) {
      state.sharedProjects = action.payload
    },
    addOwnProject(state, action: PayloadAction<Project>) {
      state.ownProjects = [...state.ownProjects, action.payload]
    },
    addSharedProject(state, action: PayloadAction<Project>) {
      state.sharedProjects = [...state.sharedProjects, action.payload]
    },
    clearProjects(state) {
      state.ownProjects = []
      state.sharedProjects = []
    },
  },
})

export const {
  changeOwnProjects,
  changeSharedProjects,
  addOwnProject,
  addSharedProject,
  clearProjects,
} = projectsSlice.actions
export default projectsSlice.reducer
