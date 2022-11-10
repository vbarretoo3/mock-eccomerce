import { useNavigate, useParams } from "react-router-dom";
import React, {useEffect, useRef, useState} from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {db} from '../../../context/Firebase';
import CustOrders from './CustOrders';
import {BsFillPencilFill} from  'react-icons/bs';
import {MdClose} from 'react-icons/md'

export default function Cust() {
  const id= useParams()
  const nameRef = useRef()
  const addressRef = useRef()
  const cityRef = useRef()
  const provinceRef = useRef()
  const postalRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const [isEditing, setIsEditing] = useState()
  const [customer, setCustomer] = useState(null)
  const docRef = doc(db, 'customers', `${id.id}`)
  const history = useNavigate()
  

  const docSnap = async() => {
    await getDoc(docRef).then((doc) => setCustomer({id: doc.id, data: doc.data()}))
  }

  useEffect(() => {
    docSnap()
  }, [])

  if (customer == null) return null

  async function handleSave() {
    const userData = {
      name: nameRef.current.value,
      address: {
        address: addressRef.current.value,
        city: cityRef.current.value,
        province: provinceRef.current.value,
        postal: postalRef.current.value
      },
      contact: {
        email: emailRef.current.value,
        phone: phoneRef.current.value
      }
    }
    const dataRef = doc(db, 'customers', customer.id)
    await updateDoc(dataRef, userData)
    history(0)
  }

  return (
    <div className='dash'>
      <div className='customer-detail-container'>
        <div className="fields right-align icons" >
          {isEditing? <MdClose className="menu-icon" onClick={() => setIsEditing(!isEditing)} />:
          <BsFillPencilFill className="menu-icon" onClick={() => setIsEditing(!isEditing)} />}
        </div>
        {isEditing? 
        <>
          <div className='fields'>
            <h3>
              Name:
            </h3>
            <input ref={nameRef} defaultValue={customer.data.name}/>
          </div>
          <div className='customer-subdetails'>
            <div className="fields">
              <h3>
                Address: 
              </h3>
              <input ref={addressRef} defaultValue={customer.data.address.address} />
              <br/>
              <h3>
                City:
              </h3>
              <input ref={cityRef} defaultValue={customer.data.address.city}/>
              <br/>
              <h3>
                Province:
              </h3>
              <input ref={provinceRef} defaultValue={customer.data.address.province}/>
              <br/>
              <h3>
                Postal Code:
              </h3>
              <input ref={postalRef} defaultValue={customer.data.address.postal}/>
            </div>
            <div className="fields">
              <h3>
                Email:
              </h3>
              <input ref={emailRef} defaultValue={customer.data.contact.email}/>
              <br/>
              <h3>
                Phone:
              </h3>
              <input ref={phoneRef} defaultValue={customer.data.contact.phone}/>
              <br/>
            </div>
          </div>
        </>
        :
        <>
          
          <div className='fields'>
            <h3>
              Name:
            </h3>
            <p>{customer.data.name}</p>
          </div>
          <div className='customer-subdetails'>
            <div className="fields">
              <h3>
                Address: 
              </h3>
              <p>{customer.data.address.address}</p>
              <br/>
              <h3>
                City:
              </h3><p>{customer.data.address.city}</p>
              <br/>
              <h3>
                Province:
              </h3>
              <p>{customer.data.address.province}</p>
              <br/>
              <h3>
                Postal Code:
              </h3>
              <p>{customer.data.address.postal}</p>
            </div>
            <div className="fields">
              <h3>
                Email:
              </h3>
              <p>{customer.data.contact.email}</p>
              <br/>
              <h3>
                Phone:
              </h3>
              <p>{customer.data.contact.phone}</p>
              <br/>
            </div>
          </div>
        </>}
        <div className="fields">
          <CustOrders customer={customer}/>
        </div>
        <div>
          {isEditing? 
          <>
            <button onClick={handleSave}>Save</button>
          </>
          :
          null }
        </div>
      </div>
    </div>
  )
}
