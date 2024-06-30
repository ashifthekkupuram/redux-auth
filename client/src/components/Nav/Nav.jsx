import React from 'react'
import { Link } from 'react-router-dom'

import './Nav.css'

const Nav = () => {
  return (
    <div className='nav'>
      <Link to="/" >Home</Link>
      <Link to="/login" >Login</Link>
      <Link to="/register" >Register</Link>
    </div>
  )
}

export default Nav
