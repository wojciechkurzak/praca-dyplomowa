import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './features/auth-slice/auth-slice'

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
  },
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
