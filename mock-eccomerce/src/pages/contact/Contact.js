import React, { useRef } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../context/Firebase'
import { useNavigate } from 'react-router-dom';

export default function Contact() {
  const nameRef = useRef()
  const emailRef = useRef()
  const messageRef = useRef()
  const history = useNavigate()

  async function handleSubmit(event) {
    event.preventDefault()
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      message: messageRef.current.value,
    }
    try{
      await addDoc(collection(db, 'messages'), data)
      history('/')
    } catch(e) {
      console.log(e)
    }
  }

  return (
    <div className='default-container'>
      <h1>Contact Us</h1>
      <br/>
      <div className='contact-container'>
        <form type='Submit' onSubmit={handleSubmit} className='contact-form'>
          <div className='contact-item'>
            <label>
              Name:
            </label>
            <input ref={nameRef} type='text' name='name' />
          </div>
          <div className='contact-item'>
            <label>
              Email:
            </label>
            <input ref={emailRef} type='text' name='email' />
          </div>
          <div className='contact-item'>
            <label>
              Message:
            </label>
            <textarea ref={messageRef} name='message'></textarea>
          </div>
          <button className='contact-button' type="Submit">Submit</button>
        </form>
      </div>
    </div>
  )
}
