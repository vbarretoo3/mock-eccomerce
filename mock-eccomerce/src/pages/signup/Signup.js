import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Signup() {
  const history = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()
  const confPasswordRef = useRef()
  const [error, setError] = useState(null)
  const {signup} = useAuth()
  async function handleSubmit(e) {
    e.preventDefault()
    if (passwordRef.current.value !== confPasswordRef.current.value) {
        return setError('Passwords do not match')
    }
    try {
      await signup(emailRef.current.value, passwordRef.current.value)
      history('/info')
    } catch {
      setError('Something went wrong')
    }
  }

  return (
    <div className='login-container'>
      <form type='Submit' onSubmit={handleSubmit} className='contact-form'>
        {error && <p>{error}</p>}
        <h1>Sign Up</h1>
        <label>Email</label>
        <input ref={emailRef} type='email' name='email' />
        <label>Password</label>
        <input ref={passwordRef} type='password' name='password' />
        <label>Confirm Password</label>
        <input ref={confPasswordRef} type='password' name='password' />
        <div className='login-button-container'>
            <button className='login-button' type='submit'>Login</button>
        </div>
        <div className='divider'>&nbsp;</div>
        <p>Do you already have an Account? <a className='contact-link' href='/login'>Log In</a></p>
      </form>
    </div>
  )
}
