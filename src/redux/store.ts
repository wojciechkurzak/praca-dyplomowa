import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './features/auth-slice/auth-slice'
import projectsSliceReducer from './features/projects-slice/projects-slice'

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    projects: projectsSliceReducer,
  },
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
