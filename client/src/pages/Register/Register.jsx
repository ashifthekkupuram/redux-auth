import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useRegisterMutation } from '../../features/auth/authApiSlice'

import './Register.css'

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
const USERNAME_REGEX = /^(?=.*[a-z])[a-z]+[a-z0-9_]{2,24}$/

const Register = () => {

  const [form, setForm] = useState({ email: '', username: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const [register] = useRegisterMutation()

  const onChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const Data = await register({...form}).unwrap()
      setForm({ email: '', username: '', password: '' })
      setError(null)
      navigate('/login')
    } catch (err) {
      if(err?.data?.message){
        setError(err.data.message)
      }else{
        setError('Internal Server Error')
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='container' onSubmit={onSubmit}>
      <form className='form'>
        { error ? <div className='alert alert-danger'> {error} </div> : null }
        <label htmlFor='email'>Email: </label>
        <input value={form.email} type='email' name='email' id='email' onChange={onChange} required />
        <label htmlFor='username'>Username: </label>
        <input value={form.username} type='text' name='username' id='username' onChange={onChange} required />
        <label htmlFor='password'>Password: </label>
        <input value={form.password} type='password' name='password' id='password' onChange={onChange} required />
        <button disabled={!form.email.match(EMAIL_REGEX) || !form.username.match(USERNAME_REGEX) || !form.password || loading}>{loading ? 'Loading...' : 'Register'}</button>
      </form>
    </div>
  )
}

export default Register
