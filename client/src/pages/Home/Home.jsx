import React from 'react'
import { useSelector } from 'react-redux'

import { selectCurrentUser, selectCurrentToken } from '../../features/auth/authSlice'
import './Home.css'

const Home = () => {

  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)

  const welcome = user ? `Welcome ${user}` : 'Welcome'

  return (
    <div className='container'>
      <h1>{welcome}</h1>
      <h2>{token.slice(0,9)}...</h2>
    </div>
  )
}

export default Home
