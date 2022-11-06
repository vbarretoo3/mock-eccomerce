import { useNavigate } from "react-router-dom";
import React, {useRef} from 'react';
import { addDoc, collection } from 'firebase/firestore';
import {db} from '../../../../context/Firebase';

export default function AddVendor() {
  const nameRef = useRef()
  const addressRef = useRef()
  const cityRef = useRef()
  const provinceRef = useRef()
  const postalRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const websiteRef = useRef()
  const history = useNavigate()

  function handleCancel() {
    history(`/dashboard/vendors`)
  }

  async function handleSave(e) {
    e.preventDefault()
    const docData = {
      name: nameRef.current.value,
      contact: {
        email: emailRef.current.value,
        phone: phoneRef.current.value,
        website: websiteRef.current.value
      },
      address: {
        address: addressRef.current.value,
        city: cityRef.current.value,
        postal: postalRef.current.value,
        province: provinceRef.current.value,
      }
    }
    const docRef = await addDoc(collection(db, 'vendors'), docData)
    history(`/dashboard/vendors/${docRef.id}`)
  }


  return (
    <div className='dash'>
      <form type='Submit' onSubmit={handleSave}>
        <div className='customer-detail-container'>
          <div className='fields'>
            <h3>
            <span style={{color: 'red'}}>*</span>Vendor Name:
            </h3>
            <input ref={nameRef} placeholder='Name' required/>
          </div>
          <div className='customer-subdetails'>
            <div className="fields">
              <h3>
                Address: 
              </h3>
              <input ref={addressRef} placeholder='Address' />
              <br/>
              <h3>
                City:
              </h3>
              <input ref={cityRef} placeholder='City'/>
              <br/>
              <h3>
                Province:
              </h3>
              <input ref={provinceRef} placeholder='Province'/>
              <br/>
              <h3>
                Postal Code:
              </h3>
              <input ref={postalRef} placeholder='Postal Code'/>
            </div>
            <div className="fields">
              <h3>
                Email:
              </h3>
              <input ref={emailRef} placeholder='Email'/>
              <br/>
              <h3>
                Phone:
              </h3>
              <input ref={phoneRef} placeholder='555-555-5555'/>
              <br/>
              <h3>
                website:
              </h3>
              <p>
              <input ref={websiteRef} placeholder='www.website.com'/>
              </p>
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
