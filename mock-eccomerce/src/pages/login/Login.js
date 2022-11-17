import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Login() {
  const history = useNavigate()
  const emailRef = useRef()
  const passwordRef = useRef()
  const [error, setError] = useState(null)
  const {logIn} = useAuth()
  function handleSubmit(e) {
    e.preventDefault()
    try {
      logIn(emailRef.current.value, passwordRef.current.value)
      history('/')
    } catch {
      setError('Something went wrong')
    }
  }

  return (
    <div className='login-container'>
      <form type='Submit' onSubmit={handleSubmit} className='contact-form'>
        {error && <p>{error}</p>}
        <h1>Log In</h1>
        <label>Email</label>
        <input ref={emailRef} type='email' name='email' />
        <label>Password</label>
        <input ref={passwordRef} type='password' name='password' />
        <div className='login-button-container'>
          <button type='submit' className='login-button'>Login</button>
        </div>
        <div className='divider'>&nbsp;</div>
        <p>Forgot your Password? <a className='contact-link' href='/forgot'>Click Here</a></p>
        <p>Dont have an Account? <a className='contact-link' href='/signup'>Sign Up</a></p>
      </form>
    </div>
  )
}
