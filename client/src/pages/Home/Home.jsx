import React,{ useState, useEffect } from 'react'
import moment from 'moment'
import { useSelector } from 'react-redux'

import { selectCurrentUser, selectCurrentToken } from '../../features/auth/authSlice'
import { useGetNotesMutation } from '../../features/note/noteApiSlice'
import './Home.css'

const Home = () => {

  const user = useSelector(selectCurrentUser)
  const token = useSelector(selectCurrentToken)

  const [notes, setNotes] = useState([])

  const [getNotes] = useGetNotesMutation()

  const welcome = user ? `Welcome ${user.username}` : 'Welcome'

  useEffect(()=>{
    const fetchNotes = async () => {
      try{
        const data = await getNotes().unwrap()
        console.log(data.notes)
      } catch(err) {
        console.log(err.data)
      }
    }
    fetchNotes()
  },[])

  return (
    <div className='container'>
      <h1>{welcome}</h1>
      <h3>Joined at {user ? moment(user.createdAt).format('YYYY MMMM D') : null } </h3>
      
    </div>
  )
}

export default Home
