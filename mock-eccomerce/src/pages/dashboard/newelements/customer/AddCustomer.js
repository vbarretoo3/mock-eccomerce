import { addDoc, collection } from 'firebase/firestore';
import React, {useRef} from 'react';
import {db} from '../../../../context/Firebase';
import { useNavigate } from 'react-router-dom';

export default function AddCustomer() {
  const nameRef = useRef()
  const addressRef = useRef()
  const cityRef = useRef()
  const provinceRef = useRef()
  const postalRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const history = useNavigate()

  function handleCancel() {
    history(`/dashboard/customers`)
  }

  async function handleSave(e) {
    e.preventDefault()
    const docData = {
      name: nameRef.current.value,
      contact: {
        email: emailRef.current.value,
        phone: phoneRef.current.value,
      },
      address: {
        address: addressRef.current.value,
        city: cityRef.current.value,
        postal: postalRef.current.value,
        province: provinceRef.current.value,
      }
    }
    const docRef = await addDoc(collection(db, 'customers'), docData)
    history(`/dashboard/customers/${docRef.id}`)
  }

  return (
    <div className='dash'>
      <form type='Submit' onSubmit={handleSave}>
        <div className='customer-detail-container'>
          <div className='fields'>
            <h3>
              <span style={{color: 'red'}}>*</span>Name:
            </h3>
            <input ref={nameRef} placeholder='Name' required/>
          </div>
          <div className='customer-subdetails'>
            <div className="fields">
              <h3>
              <span style={{color: 'red'}}>*</span>Address: 
              </h3>
                <input ref={addressRef} placeholder='Address' required/>
              <br/>
              <h3>
              <span style={{color: 'red'}}>*</span>City:
              </h3>
                <input ref={cityRef} placeholder='City' required/>
              <br/>
              <h3>
              <span style={{color: 'red'}}>*</span>Province:
              </h3>
                <input ref={provinceRef} placeholder='Province' required/>
              <br/>
              <h3>
              <span style={{color: 'red'}}>*</span>Postal Code:
              </h3>
              <input ref={postalRef} placeholder='Postal Code' required/>
            </div>
            <div className="fields">
              <h3>
              <span style={{color: 'red'}}>*</span>Email:
              </h3>
              <input ref={emailRef} placeholder='email' required/>
              <br/>
              <h3>
                Phone:
              </h3>
              <input ref={phoneRef} placeholder='555-555-5555' />
              <br/>
            </div>
          </div>
          <div>
            <button type="Submit">Save</button>
            <button type="button" onClick={handleCancel}>Cancel</button>
          </div>
        </div>
      </form>
    </div>
  )
}
