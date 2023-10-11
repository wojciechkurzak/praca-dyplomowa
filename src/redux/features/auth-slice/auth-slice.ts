import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AuthState, AuthStatePayload } from './auth-slice-types'

const initialState: AuthState = {
  value: null,
}

const authSlice = createSlice({
  name: 'auth-state',
  initialState,
  reducers: {
    changeAuthState(state, action: PayloadAction<AuthStatePayload>) {
      state.value = action.payload
    },
  },
})

export const { changeAuthState } = authSlice.actions
export default authSlice.reducer
