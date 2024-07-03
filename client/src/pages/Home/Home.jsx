import React from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'

import { selectCurrentUser, selectCurrentToken } from '../../features/auth/authSlice'
import './Home.css'

const Home = () => {

  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)

  const welcome = user ? `Welcome ${user.username}` : 'Welcome'

  return (
    <div className='container'>
      <h1>{welcome}</h1>
      <h3>Joined at {user ? moment(user.createdAt).format('YYYY MMMM D') : null } </h3>
    </div>
  )
}

export default Home
