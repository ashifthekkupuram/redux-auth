import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCurrentToken } from '../features/auth/authSlice'

import React from 'react'

const RedirectAuth = () => {

    const token = useSelector(selectCurrentToken)
    const location = useLocation()

  return (
    token ? <Navigate to='/' state={{ from: location }} replace /> : <Outlet />
  )
}

export default RedirectAuth
