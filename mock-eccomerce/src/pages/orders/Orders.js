import { collection, getDocs, query, where } from 'firebase/firestore'
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { db } from '../../context/Firebase'
import NonUserOrder from './NonUserOrder'

export default function Orders() {
  const {currentUser} = useAuth()
  if (!currentUser) return <NonUserOrder/>
  const [orders, setOrders] = useState(null)
  const id = currentUser.uid
  const snap = async () => {
    const orderArr = []
    const q = query(collection(db, 'orders'), where('customer.customerRef', '==', id))
    const snapshot = await getDocs(q)
    snapshot.forEach((order) => orderArr.push({id: order.id, data: order.data()}))
    setOrders(orderArr)
  }

  useEffect(() => {
    snap()
  },[])

  console.log(id)
  if (orders===null) return null

  return (
    <div className='orders-background'>
      <div className='show-orders default-container orders-color'>
        <h3>
            Previous Purchases:
        </h3>
        <div>
            <div className='table-headers order-headers orders-color'>
            <h4>Order#</h4>
            <h4>Status</h4>
            <h4>Customer</h4>
            <h4>Subtotal</h4>
            <h4>Tax</h4>
            <h4>Total</h4>
            </div>
        </div>
        {orders.map((order) =>
        <a key={order.id} href={'/dashboard/orders/' + orders[0].id} className='orders-links' >
            <div className='table-headers order-headers details-border rounded-border'> 
                <p>
                    {order.data.id}
                </p>
                <p>
                    {order.data.status}
                </p>
                <p>
                    {order.data.customer.name}
                </p>
                <p>
                    {order.data.subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
                </p>
                <p>
                    {order.data.tax.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
                </p>
                <p>
                    {order.data.total.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
                </p>
            </div>
        </a>
        )}
      </div>
    </div>
  )
}
