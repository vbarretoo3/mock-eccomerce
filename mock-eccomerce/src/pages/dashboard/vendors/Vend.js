import { useParams } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import { doc, getDoc } from 'firebase/firestore';
import {db} from '../../../context/Firebase';
import PurchOrders from './PurchOrders';

export default function Vend() {
  const id= useParams()
  const [vendor, setVendor] = useState(null)
  const docRef = doc(db, 'vendors', `${id.id}`)

  const docSnap = async() => {
    await getDoc(docRef).then((doc) => setVendor(doc.data()))
  }

  useEffect(() => {
    docSnap()
  }, [])

  if (vendor == null) return null

  return (
    <div className='customer-detail-container'>
      <div className='fields'>
        <h3>
          Name:
        </h3>
        <p>{vendor.name}</p>
      </div>
      <div className='customer-subdetails'>
        <div className="fields">
          <h3>
            Address: 
          </h3>
          <p>{vendor.address.address}</p>
          <br/>
          <h3>
            City:
          </h3><p>{vendor.address.city}</p>
          <br/>
          <h3>
            Province:
          </h3>
          <p>{vendor.address.province}</p>
          <br/>
          <h3>
            Postal Code:
          </h3>
          <p>{vendor.address.postal}</p>
        </div>
        <div className="fields">
          <h3>
            Email:
          </h3>
          <p>{vendor.contact.email}</p>
          <br/>
          <h3>
            Phone:
          </h3>
          <p>{vendor.contact.phone}</p>
          <br/>
          <h3>
            website:
          </h3>
          <p>
            {vendor.contact.website}
          </p>
        </div>
      </div>
      <div className="fields">
        <PurchOrders vendor={vendor}/>
      </div>
    </div>
  )
}
