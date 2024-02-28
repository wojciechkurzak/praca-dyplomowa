import { configureStore } from '@reduxjs/toolkit'
import authSliceReducer from './features/auth-slice/auth-slice'
import projectsSliceReducer from './features/projects-slice/projects-slice'
import projectNavigationReducer from './features/project-navigation-slice/project-navigation-slice'

export const store = configureStore({
  reducer: {
    auth: authSliceReducer,
    projects: projectsSliceReducer,
    projectNavigation: projectNavigationReducer,
  },
})

export type AppDispatch = typeof store.dispatch

export type RootState = ReturnType<typeof store.getState>
