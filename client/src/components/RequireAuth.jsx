import { useLocation, Navigate, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCurrentToken } from '../features/auth/authSlice'

import React from 'react'

const RequireAuth = () => {

    const token = useSelector(selectCurrentToken)
    const location = useLocation()

  return (
    token ? <Outlet /> : <Navigate to='/login' state={{ from: location }} replace />
  )
}

export default RequireAuth
