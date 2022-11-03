import React, {useEffect, useState} from 'react';
import { collection, where, getDocs,query } from 'firebase/firestore';
import {db} from '../../../context/Firebase';
import { useNavigate } from 'react-router-dom';


function CustOrders({customer}) {
    const [orders, setOrders] = useState(null)
    const history = useNavigate()
    const orderSnap = async() => {
        const ordersArr = []
        const orderQuery = query(collection(db, 'orders'), where('customer.name', '==', customer.name))
        const querysnapshot = await getDocs(orderQuery)
        querysnapshot.forEach((doc) => {ordersArr.push({id: doc.id, data: doc.data()})})
        setOrders(ordersArr)
    }

    useEffect(() => {
        orderSnap()
    }, [])

    if (orders === null) return null
    return (
        <div className={orders.length === 0? 'hide-orders': 'show-orders'}>
            <h3>
                Previous Purchases:
            </h3>
            <div>
                <div className='table-headers order-headers'>
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
                <div className='table-headers order-headers inventory-items rounded-border'> 
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
  )
}

export default CustOrders