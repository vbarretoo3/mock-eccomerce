import React, {useEffect, useState} from 'react';
import Order from './Order';
import {collection, getDocs} from 'firebase/firestore';
import {db} from '../../../context/Firebase'

export default function Orders() {
  const [orders, setOrders] = useState([])
  const docRef = collection(db, 'orders')
  const snap = async function getOrders() {
      const querysnapshot = await getDocs(docRef);
      const ordersArr = []
      querysnapshot.forEach((doc) => {
        ordersArr.push({id: doc.id, data: doc.data()})
      })
      setOrders(ordersArr)
  }
  useEffect(() => {
    snap()
  }, [])
  if (orders === null) return null
  return (
    <>
      <div>
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
    </>
  )
}
