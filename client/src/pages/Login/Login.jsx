import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import { useLoginMutation } from '../../features/auth/authApiSlice'
import { setCredentials } from '../../features/auth/authSlice'

import './Login.css'

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

const Login = () => {

  const [form, setForm] = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const [login] = useLoginMutation()

  const onChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const Data = await login({...form}).unwrap()
      dispatch(setCredentials({token: Data.accessToken, user: form.email}))
      setForm({email: '',password: ''})
      setError(null)
      navigate('/')
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
        <label htmlFor='password'>Password: </label>
        <input value={form.password} type='password' name='password' id='password' onChange={onChange} required />
        <button disabled={!form.email.match(EMAIL_REGEX) || !form.password || loading}>{loading ? 'Loading...' : 'Login'}</button>
      </form>
    </div>
  )
}

export default Login
