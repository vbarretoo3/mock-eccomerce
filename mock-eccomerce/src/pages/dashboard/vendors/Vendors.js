import React, {useEffect, useState} from 'react';
import Vendor from './Vendor';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../../context/Firebase'

export default function Vendors() {
  const [vendors, setVendors] = useState([])
  const docRef = collection(db, 'vendors')
  const snap = async function getVendors() {
      const querysnapshot = await getDocs(docRef);
      const vendorsArr = []
      querysnapshot.forEach((doc) => {
        vendorsArr.push({id: doc.id, data: doc.data()})
      })
      setVendors(vendorsArr)
  }
  useEffect(() => {
    snap()
  }, [])
  if (vendors === null) return null
  return (
    <>
      <div>
        <h2 className='title'>
          Vendors
        </h2>
        <div className='table'>
          <div className='table-headers'>
            <div>
              <h3>
                Name
              </h3>
            </div>
            <div>
              <h3>
                Email
              </h3>
            </div>
            <div>
              <h3>
                Phone
              </h3>
            </div>
            <div>
              <h3>
                Website
              </h3>
            </div>
          </div>
          {vendors.map((vendor) => 
          <Vendor key={vendor.id} id={vendor.id} item={vendor.data} />)}
        </div>
      </div>
    </>
  )
}
