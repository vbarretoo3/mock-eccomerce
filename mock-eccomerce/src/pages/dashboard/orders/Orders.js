import React, {useEffect, useState} from 'react';
import Order from './Order';
import SearchBar from '../../../components/SearchBar';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../../context/Firebase'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const [filter, setFilter] = useState('')
  const docRef = collection(db, 'orders')
  const snap = async function getOrders() {
      const querysnapshot = await getDocs(docRef);
      const ordersArr = []
      querysnapshot.forEach((doc) => {
        ordersArr.push({id: doc.id, data: doc.data()})
      })
      const ord = ordersArr.filter((order) => order.data.status.toLowerCase().includes(filter.toLowerCase()) || order.data.id === Number(filter.toLowerCase()) || order.data.customer.name.toLowerCase().includes(filter.toLowerCase()))
      setOrders(ord)
  }
  useEffect(() => {
    snap()
  }, [filter])
  if (orders === null) return null
  return (
    <>
      <div className='searchbar-grid'>
        <SearchBar filter={setFilter} />
        <div className='dash'>
          <h2 className='title'>
            Orders
          </h2>
          <div className='table'>
            <div className='table-headers order-headers'>
              <div className='table-header'>
                <h3>
                  Order #
                </h3>
              </div>
              <h3 className='table-header'>
                Status
              </h3>
              <h3 className='table-header'>
                Name
              </h3>
              <h3 className='table-header'>
                Subtotal
              </h3>
              <h3 className='table-header'>
                Tax
              </h3>
              <div className='table-header'>
                <h3>
                  Total
                </h3>
              </div>
            </div>
            {orders.map((item) => 
            <Order key={item.id} id={item.id} item={item.data} />)}
          </div>
        </div>
      </div>
    </>
  )
}
