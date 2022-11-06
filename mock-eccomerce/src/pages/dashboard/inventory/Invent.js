import { useParams } from "react-router-dom";
import React, {useEffect, useState} from 'react';
import { doc, getDoc } from 'firebase/firestore';
import {db} from '../../../context/Firebase';

export default function Invent() {
  const id= useParams()
  const [inventory, setInventory] = useState(null)
  const docRef = doc(db, 'inventory', `${id.id}`)

  const docSnap = async() => {
    await getDoc(docRef).then((doc) => setInventory(doc.data()))
  }

  useEffect(() => {
    docSnap()
  }, [])

  if (inventory == null) return null

  return (
    <div className="dash">
      <div className='customer-detail-container'>
        <div className='fields'>
          <h3>
            Item:
          </h3>
          <p>{inventory.name}</p>
        </div>
        <div className='customer-subdetails'>
          <div className="fields">
            <h3>
              Category: 
            </h3>
            <p>{inventory.category}</p>
            <br/>
            <br/>
            <h3>
              Cost:
            </h3>
            <p>{inventory.cost.toLocaleString()}</p>
            <br/>
            <br/>
            <h3>
              Mark-Up:
            </h3>
            <p>{((Number(inventory.price))/(Number(inventory.cost)))}</p>
            <br/>
            <h3>
              Price:
            </h3>
            <p>{Number(inventory.price.toLocaleString())}</p>
          </div>
          <div className="fields">
            <h3>
              Quantity
            </h3>
            <div className="left-align flex">
              <h3>
                S:
              </h3>
              <p>{inventory.quantity.small}</p>
              <br/>
              <br/>
            </div>
            <div className="left-align flex">
              <h3>
                M:
              </h3>
              <p>{inventory.quantity.medium}</p>
              <br/>
              <br/>
            </div>
            <div className="left-align flex">
              <h3>
                L:
              </h3>
              <p>{inventory.quantity.large}</p>
              <br/>
              <br/>
            </div>
            <div className="left-align flex">
              <h3>
                XL:
              </h3>
              <p>{inventory.quantity.xlarge}</p>
              <br/>
              <br/>
            </div>
          </div>
        </div>
        {inventory.vendors.length === 0 ? null : 
        <div className="fields">
          <div>
            <h3>Vendors</h3>
          </div>
          {inventory.vendors.map((vendor) => 
            <div key={vendor.vendorRef}>
              <a className="table-links" href={'/dashboard/vendors/' + vendor.vendorRef}>{vendor.name}</a>
            </div>
          )}
        </div>}
      </div>
    </div>
  )
}
