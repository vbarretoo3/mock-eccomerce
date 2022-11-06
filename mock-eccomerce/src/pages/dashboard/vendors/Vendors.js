import React, {useEffect, useState} from 'react';
import Vendor from './Vendor';
import SearchBar from '../../../components/SearchBar';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../../context/Firebase'

export default function Vendors() {
  const [vendors, setVendors] = useState([])
  const docRef = collection(db, 'vendors')
  const [filter, setFilter] = useState('')
  const snap = async function getVendors() {
      const querysnapshot = await getDocs(docRef);
      const vendorsArr = []
      querysnapshot.forEach((doc) => {
        vendorsArr.push({id: doc.id, data: doc.data()})
      })
      const vends = vendorsArr.filter((vendor) => vendor.data.name.toLowerCase().includes(filter.toLowerCase()) || vendor.data.contact.email.toLowerCase().includes(filter.toLowerCase()) || vendor.data.contact.phone.toLowerCase().includes(filter.toLowerCase()))
      setVendors(vends)
  }
  useEffect(() => {
    snap()
  }, [filter])
  if (vendors === null) return null
  return (
    <>
      <div className='searchbar-grid'>
        <SearchBar filter={setFilter} />
        <div className='dash'>
          <h2 className='title'>
            Vendors
          </h2>
          <div className='table'>
            <div className='table-headers vendor-headers'>
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
      </div>
    </>
  )
}
