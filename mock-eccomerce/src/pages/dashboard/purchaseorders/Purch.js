import { useParams } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import { doc, getDoc } from 'firebase/firestore';
import {db} from '../../../context/Firebase';
import POItem from './POItem'

export default function Ord() {
  const id= useParams()
  const [po, setPO] = useState(null)
  const docRef = doc(db, 'po', `${id.id}`)

  const docSnap = async() => {
    await getDoc(docRef).then((doc) => setPO(doc.data()))
  }

  useEffect(() => {
    docSnap()
  }, [])

  if (po == null) return null
  console.log(po)

  return (
    <div className="dash">
      <div className='customer-detail-container'>
        <div className='fields'>
          <div className='customer-subdetails'>
            <div className="fields">
              <h3>
                Vendor Name:
              </h3>
              <p>{po.vendor.name}</p>
            </div>
            <div className="fields right-align">
              <h3>
                Status: 
              </h3>
              <p>{po.status}</p>
            </div>
            <div className="fields right-align">
              <h3>
                PO #:
              </h3>
              <p>
                {po.id}
              </p>
            </div>
          </div>
          <br/>
          <div className='customer-subdetails'>
            <div className="fields">
              <h3>
                Address:
              </h3>
              <p>{po.vendor.address.address}</p>
              <h3>
                Province:
              </h3>
              <p>{po.vendor.address.province}</p>
            </div>
            <div className="fields">
              <h3>
                City:
              </h3>
              <p>{po.vendor.address.city}</p>
              <h3>
                Postal Code:
              </h3>
              <p>{po.vendor.address.postal}</p>
            </div>
          </div>
          <br/>
          <div>
            <h3>Items</h3>
            <br/>
            <div className="table-headers order-items">
              <h3>
                Name:
              </h3>
              <h3>
                Category:
              </h3>
              <h3>
                Size:
              </h3>
              <h3>
                Quantity:
              </h3>
              <h3>
                subtotal:
              </h3>
              <h3>
                tax:
              </h3>
              <h3>
                total:
              </h3>
              
            </div>
            {po.item.map((item) => 
              Object.keys(item.quantity).map((key)=>
                <POItem item={item} quantity={key.value} size={key}/>
              )
            )}
          </div>
          <br/>
          <div className='order-total'>
            <div className='order-total-details'>
              <h3>
                Subtotal:
              </h3>
              <h3 className='order-number'>
                {po.subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
              </h3>
            </div>
            <div className='order-total-details'>
              <h3>
                Tax:
              </h3>
              <h3 className='order-number'>
                {po.tax.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
              </h3>
            </div>
            <div className='order-total-details'>
              <h2>
                Total:
              </h2>
              <h2 className='order-number'>
                {po.total.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
