import React, {useEffect, useState} from 'react';
import Customer from './Customer';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../../context/Firebase'

export default function Customers() {
  const [customers, setCustomers] = useState([])
  const docRef = collection(db, 'customers')
  const snap = async function getCustomers() {
      const querysnapshot = await getDocs(docRef);
      const customersArr = []
      querysnapshot.forEach((doc) => {
        customersArr.push({id: doc.id, data: doc.data()})
      })
      setCustomers(customersArr)
  }
  useEffect(() => {
    snap()
  }, [])

  if (customers === null) return null
  return (
    <>
      <div>
        <h2 className='title'>
          Customers
        </h2>
        <div className='table'>
          <div className='table-headers'>
            <div className='table-header'>
              <h3>
                Name
              </h3>
            </div>
            <h3 className='table-header'>
              Email
            </h3>
            <h3 className='table-header'>
              Address
            </h3>
          </div>
          {customers.map((customer) => 
          <Customer key={customer.id} id={customer.id} item={customer.data}/>)}
        </div>
      </div>
    </>
  )
}
