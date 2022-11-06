import { useParams } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import { doc, getDoc } from 'firebase/firestore';
import {db} from '../../../context/Firebase';
import CustOrders from './CustOrders';

export default function Cust() {
  const id= useParams()
  const [customer, setCustomer] = useState(null)
  const docRef = doc(db, 'customers', `${id.id}`)

  const docSnap = async() => {
    await getDoc(docRef).then((doc) => setCustomer({id: doc.id, data: doc.data()}))
  }

  useEffect(() => {
    docSnap()
  }, [])

  if (customer == null) return null

  return (
    <div className='dash'>
      <div className='customer-detail-container'>
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
        <div className="fields">
          <CustOrders customer={customer}/>
        </div>
      </div>
    </div>
  )
}
