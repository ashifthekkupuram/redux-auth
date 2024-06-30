import React, { useState } from 'react'

import './Login.css'

const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g

const Login = () => {

  const [form, setForm] = useState({ email: '', password: '' })

  const onChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.id]: e.target.value }))
  }

  const onSubmit = (e) => {
    e.preventDefault()
    console.log(form)
  }

  return (
    <div className='container' onSubmit={onSubmit}>
      <form className='form'>
        <label htmlFor='email'>Email: </label>
        <input value={form.email} type='email' name='email' id='email' onChange={onChange} required />
        <label htmlFor='password'>Password: </label>
        <input value={form.password} type='password' name='password' id='password' onChange={onChange} required />
        <button disabled={!form.email.match(EMAIL_REGEX) || !form.password}>Login</button>
      </form>
    </div>
  )
}

export default Login
