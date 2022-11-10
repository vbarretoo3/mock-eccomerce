import { useNavigate, useParams } from "react-router-dom";
import React, {useEffect, useState, useRef} from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {db} from '../../../context/Firebase';
import PurchOrders from './PurchOrders';
import {BsFillPencilFill} from  'react-icons/bs';
import {MdClose} from 'react-icons/md'

export default function Vend() {
  const id= useParams()
  const nameRef = useRef()
  const addressRef = useRef()
  const cityRef = useRef()
  const provinceRef = useRef()
  const postalRef = useRef()
  const emailRef = useRef()
  const phoneRef = useRef()
  const websiteRef = useRef()
  const [isEditing, setIsEditing] = useState()
  const [vendor, setVendor] = useState(null)
  const docRef = doc(db, 'vendors', `${id.id}`)
  const history = useNavigate()

  const docSnap = async() => {
    await getDoc(docRef).then((doc) => setVendor({id:doc.id, data:doc.data()}))
  }

  useEffect(() => {
    docSnap()
  }, [])

  if (vendor == null) return null
  
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
        phone: phoneRef.current.value,
        website: websiteRef.current.value
      }
    }
    const dataRef = doc(db, 'vendors', vendor.id)
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
                Vendor Name:
              </h3>
              <input ref={nameRef} defaultValue={vendor.data.name}/>
            </div>
            <div className='customer-subdetails'>
              <div className="fields">
                <h3>
                  Address: 
                </h3>
                <input ref={addressRef} defaultValue={vendor.data.address.address}/>
                <br/>
                <h3>
                  City:
                </h3>
                <input ref={cityRef} defaultValue={vendor.data.address.city}/>
                <br/>
                <h3>
                  Province:
                </h3>
                <input ref={provinceRef} defaultValue={vendor.data.address.province}/>
                <br/>
                <h3>
                  Postal Code:
                </h3>
                <input ref={postalRef} defaultValue={vendor.data.address.postal}/>
              </div>
              <div className="fields">
                <h3>
                  Email:
                </h3>
                <input ref={emailRef} defaultValue={vendor.data.contact.email}/>
                <br/>
                <h3>
                  Phone:
                </h3>
                <input ref={phoneRef} defaultValue={vendor.data.contact.phone}/>
                <br/>
                <h3>
                  website:
                </h3>
                <input ref={websiteRef} tipe='url' defaultValue={vendor.data.contact.website}/>
              </div>
            </div>
            <div className="fields">
              <PurchOrders vendor={vendor}/>
            </div>
          </>
        :
        <>
          <div className='fields'>
            <h3>
              Name:
            </h3>
            <p>{vendor.data.name}</p>
          </div>
          <div className='customer-subdetails'>
            <div className="fields">
              <h3>
                Address: 
              </h3>
              <p>{vendor.data.address.address}</p>
              <br/>
              <h3>
                City:
              </h3><p>{vendor.data.address.city}</p>
              <br/>
              <h3>
                Province:
              </h3>
              <p>{vendor.data.address.province}</p>
              <br/>
              <h3>
                Postal Code:
              </h3>
              <p>{vendor.data.address.postal}</p>
            </div>
            <div className="fields">
              <h3>
                Email:
              </h3>
              <p>{vendor.data.contact.email}</p>
              <br/>
              <h3>
                Phone:
              </h3>
              <p>{vendor.data.contact.phone}</p>
              <br/>
              <h3>
                website:
              </h3>
              <p>
                {vendor.data.contact.website}
              </p>
            </div>
          </div>
          <div className="fields">
            <PurchOrders vendor={vendor}/>
          </div>
        </>}
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
