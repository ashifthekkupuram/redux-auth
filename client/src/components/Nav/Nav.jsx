import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { selectCurrentToken } from '../../features/auth/authSlice'
import { useSendLogoutMutation } from '../../features/auth/authApiSlice'

import './Nav.css'

const Nav = () => {

  const navigate = useNavigate()

  const token = useSelector(selectCurrentToken)

  const [sendLogout] = useSendLogoutMutation()

  const onClick = async () => {
    try{
      await sendLogout().unwrap()
      navigate('/login')
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className='nav'>
      { token ? 
      <>
        <Link to="/" >Home</Link>
        <button onClick={onClick} >Logout</button>
      </> : 
      <>
        <Link to="/login" >Login</Link>
        <Link to="/register" >Register</Link>
      </> }
    </div>
  )
}

export default Nav
