import React from 'react'
import { Outlet } from 'react-router-dom'

import './Layout.css'
import Nav from '../Nav/Nav'

const Layout = () => {
  return (
    <div className='main'>
        <Nav />
        <Outlet />
    </div>
  )
}

export default Layout
