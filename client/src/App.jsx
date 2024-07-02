import React from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'

import { Home, Login, Register, NotFound404 } from './pages'
import Layout from './components/Layout/Layout'
import RequireAuth from './components/RequireAuth'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <RequireAuth />,
        children: [{
          path: '',
          element: <Home />
        }]
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/register',
        element: <Register />
      },
      {
        path: '*',
        element: <NotFound404 />
      },
    ]
  }
])

const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App
