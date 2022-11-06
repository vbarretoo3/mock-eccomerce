import React, {useEffect, useState} from 'react';
import Customer from './Customer';
import SearchBar from '../../../components/SearchBar';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../../context/Firebase'

export default function Customers() {
  const [customers, setCustomers] = useState([])
  const [filter, setFilter] = useState('')
  const docRef = collection(db, 'customers')
  const snap = async function getCustomers() {
      const querysnapshot = await getDocs(docRef);
      const customersArr = []
      querysnapshot.forEach((doc) => {
        customersArr.push({id: doc.id, data: doc.data()})
      })
      const custs = customersArr.filter((customer) => customer.data.name.toLowerCase().includes(filter.toLowerCase()) || customer.data.contact.email.toLowerCase().includes(filter.toLowerCase()) || customer.data.address.address.toLowerCase().includes(filter.toLowerCase()))
      setCustomers(custs)

  }

  useEffect(() => {
    snap()
  }, [filter])

  if (customers === null) return null
  return (
    <>
      <div className='searchbar-grid'>
        <SearchBar filter={setFilter}/>
        <div className='dash'>
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
      </div>
    </>
  )
}
