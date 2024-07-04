import React, { useEffect, useState } from 'react'
import { createBrowserRouter,RouterProvider } from 'react-router-dom'
import { useDispatch } from 'react-redux'

import { Home, Login, Register, NotFound404,About } from './pages'
import Layout from './components/Layout/Layout'
import RequireAuth from './components/RequireAuth'
import RedirectAuth from './components/RedirectAuth'

import { useRefreshMutation } from './features/auth/authApiSlice'
import { setCredentials } from './features/auth/authSlice'

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
        path: '/',
        element: <RedirectAuth />,
        children: [
          {
            path: '/login',
            element: <Login />
          },
          {
            path: '/register',
            element: <Register />
          },
        ]
      },
      {
        path: '/about',
        element: < About />
      },
      {
        path: '*',
        element: <NotFound404 />
      },
    ]
  }
])

const App = () => {

  // const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  const [refresh] = useRefreshMutation()

  useEffect(()=>{
    const fetchToken = ()=> {
      // setLoading(true)
      try{
        const Data = refresh().unwrap()
        dispatch(setCredentials({...Data}))
      } catch (err) {
        // console.log(err)
      } finally {
        // setLoading(false)
      }
    }
    fetchToken()
  },[])

  return (
    <RouterProvider router={router} />
  )
}

export default App
