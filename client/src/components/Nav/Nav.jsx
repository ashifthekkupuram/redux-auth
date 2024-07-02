import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCurrentToken } from '../../features/auth/authSlice'

import './Nav.css'

const Nav = () => {

  const token = useSelector(selectCurrentToken)

  return (
    <div className='nav'>
      <Link to="/" >Home</Link>
      { token ? 
      <>
        <Link to="/" >Home</Link>
      </> : 
      <>
        <Link to="/login" >Login</Link>
        <Link to="/register" >Register</Link>
      </> }
    </div>
  )
}

export default Nav
