import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function Forgot() {
  const history = useNavigate()
  const emailRef = useRef()
  const [error, setError] = useState(null)
  const { resetPassword } = useAuth()
  function handleSubmit(e) {
    e.preventDefault()
    try {
      resetPassword(emailRef.current.value)
      history('/')
    } catch {
      setError('Something went wrong')
    }
  }

  return (
    <div className='login-container'>
      <form type='Submit' onSubmit={handleSubmit} className='contact-form'>
        {error && <p>{error}</p>}
        <h1>Reset Password</h1>
        <label>Email</label>
        <input ref={emailRef} type='email' name='email' />
        <div className='login-button-container'>
          <button className='login-button' type='submit'>Reset Password</button>
        </div>
        <div className='divider'>&nbsp;</div>
        <p>Dont have an Account? <a className='contact-link' href='/signup'>Sign Up</a></p>
      </form>
    </div>
  )
}
