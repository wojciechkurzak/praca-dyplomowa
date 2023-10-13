import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState } from './auth-slice-types'

const initialState: AuthState = {
  uid: null,
  username: null,
  email: null,
  imageUrl: null,
}

const authSlice = createSlice({
  name: 'auth-state',
  initialState,
  reducers: {
    changeAuthState(state, action: PayloadAction<AuthState>) {
      state.uid = action.payload.uid
      state.username = action.payload.username
      state.email = action.payload.email
      state.imageUrl = action.payload.imageUrl
    },
  },
})

export const { changeAuthState } = authSlice.actions
export default authSlice.reducer
