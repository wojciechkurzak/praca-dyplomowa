import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { routesConfig } from './config/routes/routes.tsx'
import { Provider } from 'react-redux'
import { store } from './redux/store.ts'

const router = createBrowserRouter(routesConfig)

ReactDOM.createRoot(document.getElementById('root')!).render(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  <Provider store={store}>
    <RouterProvider router={router} />
  </Provider>
)
