import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProjectNavigationState } from './project-navigation-slice-types'

const initialState: ProjectNavigationState = false

const projectNavigationSlice = createSlice({
  name: 'auth-state',
  initialState,
  reducers: {
    changeProjectNavigationState(state, action: PayloadAction<boolean>) {
      return action.payload
    },
  },
})

export const { changeProjectNavigationState } = projectNavigationSlice.actions
export default projectNavigationSlice.reducer
