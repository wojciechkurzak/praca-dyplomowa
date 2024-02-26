import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from './auth-slice-types'

const initialState: AuthState = {
  uid: null,
  username: null,
  email: null,
  ownProjects: [],
  sharedProjects: [],
}

const authSlice = createSlice({
  name: 'auth-state',
  initialState,
  reducers: {
    changeAuthState(state, action: PayloadAction<AuthState>) {
      state.uid = action.payload.uid
      state.username = action.payload.username
      state.email = action.payload.email
      state.ownProjects = action.payload.ownProjects
      state.sharedProjects = action.payload.sharedProjects
    },
    changeUID(state, action: PayloadAction<string>) {
      state.uid = action.payload
    },
    changeUsername(state, action: PayloadAction<string>) {
      state.username = action.payload
    },
    changeOwnProjects(state, action: PayloadAction<string[]>) {
      state.ownProjects = action.payload
    },
    changeSharedProjects(state, action: PayloadAction<string[]>) {
      state.sharedProjects = action.payload
    },
  },
})

export const {
  changeAuthState,
  changeUsername,
  changeOwnProjects,
  changeSharedProjects,
  changeUID,
} = authSlice.actions
export default authSlice.reducer
