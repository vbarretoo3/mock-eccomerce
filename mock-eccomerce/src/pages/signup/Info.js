import React, { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../context/Firebase'
import { useAuth } from '../../context/AuthContext';


export default function Info() {
    const {currentUser} = useAuth()
    const history = useNavigate()
    const addressRef = useRef()
    const postalRef = useRef()
    const cityRef = useRef()
    const provinceRef = useRef()
    const phoneRef = useRef()
    const nameRef = useRef()
    const [error, setError] = useState(null)
    const id = currentUser.uid

    async function handleSubmit(e) {
        e.preventDefault()
        const data = {
            name: nameRef.current.value,
            'contact.phone': phoneRef.current.value,
            address: {
                address: addressRef.current.value,
                postal: postalRef.current.value,
                city: cityRef.current.value,
                province: provinceRef.current.value,
            },
            status: 'customer' 
        }
        try {
            await updateDoc(doc(db, 'customers', id), data)
            history('/')
        } catch {
            setError('Something went wrong')
        }
    }

    return (
        <div className='login-container'>
        <form type='Submit' onSubmit={handleSubmit} className='contact-form'>
            {error && <p>{error}</p>}
            <h1>Set Up Profile</h1>
            <div className='info-grid'>
                <div>
                    <label>Name<span style={{color: 'red'}}>*</span></label>
                    <input ref={nameRef} type='text' required/>
                    <label type='phone'>phone</label>
                    <input ref={phoneRef} type='phone'/>
                </div>
                <div>
                    <label>Address<span style={{color: 'red'}}>*</span></label>
                    <input ref={addressRef} type='text' required/>
                    <label>City<span style={{color: 'red'}}>*</span></label>
                    <input ref={cityRef} type='text' required/>
                    <label>Postal<span style={{color: 'red'}}>*</span></label>
                    <input ref={postalRef} type='text' required/>
                    <label>Province<span style={{color: 'red'}}>*</span></label>
                    <input ref={provinceRef} type='text' required/>
                </div>
            </div>
            <div className='login-button-container'>
                <button className='login-button' type='submit'>Save</button>
            </div>
        </form>
        </div>
    )
}
