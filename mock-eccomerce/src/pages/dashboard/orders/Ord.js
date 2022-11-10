import { useNavigate, useParams } from "react-router-dom";
import React, {useEffect, useState, useRef} from 'react';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import {db} from '../../../context/Firebase';
import {BsFillPencilFill} from  'react-icons/bs';
import {MdClose} from 'react-icons/md'
import OrderItem from './OrderItem'

export default function Ord() {
  const id= useParams()
  const nameRef = useRef()
  const categoryRef = useRef()
  const costRef = useRef()
  const priceRef = useRef()
  const smallRef = useRef()
  const mediumRef = useRef()
  const largeRef = useRef()
  const xlargeRef = useRef()
  const vendorRef = useRef()
  const [isEditing, setIsEditing] = useState()
  const [order, setOrder] = useState(null)
  const docRef = doc(db, 'orders', `${id.id}`)
  const history = useNavigate()

  const docSnap = async() => {
    await getDoc(docRef).then((doc) => setOrder(doc.data()))
  }

  useEffect(() => {
    docSnap()
  }, [])

  if (order == null) return null
  
  async function handleSave() {
    const vendorInfo = vendorRef.current.value.split(',')
    const userData = {
      name: nameRef.current.value,
      category: categoryRef.current.value,
      price: Number(priceRef.current.value),
      cost: Number(costRef.current.value),
      quantity: {
        small: Number(smallRef.current.value),
        medium: Number(mediumRef.current.value),
        large: Number(largeRef.current.value),
        xlarge: Number(xlargeRef.current.value)
      },
      vendors: [
        {
          name: vendorInfo[0],
          vendorRef: vendorInfo[1],
        },
      ],
    }
  const dataRef = doc(db, 'inventory', order.id)
  await updateDoc(dataRef, userData)
  history(0)
  }

  return (
    <div className="dash">
      <div className='customer-detail-container'>
        <div className="fields right-align icons" >
          {isEditing? <MdClose className="menu-icon" onClick={() => setIsEditing(!isEditing)} />:
          <BsFillPencilFill className="menu-icon" onClick={() => setIsEditing(!isEditing)} />}
        </div>
        {isEditing? 
        <>
          <div className='fields'>
            <div className='customer-subdetails'>
              <div className="fields">
                <h3>
                  Customer Name:
                </h3>
                <p>{order.customer.name}</p>
              </div>
              <div className="fields right-align">
                <h3>
                  Status:
                </h3>
                <select defaultValue={order.status}>
                  <option>{order.status} </option>
                </select>
              </div>
              <div className="fields right-align">
                <h3>
                  Order #:
                </h3>
                <p>
                  {order.id}
                </p>
              </div>
            </div>
            <br/>
            <div className='customer-subdetails'>
              <div className="fields">
                <h3>
                  Address:
                </h3>
                <p>{order.customer.address.address}</p>
                <h3>
                  Province:
                </h3>
                <p>{order.customer.address.province}</p>
              </div>
              <div className="fields">
                <h3>
                  City:
                </h3>
                <p>{order.customer.address.city}</p>
                <h3>
                  Postal Code:
                </h3>
                <p>{order.customer.address.postal}</p>
              </div>
            </div>
            <br/>
            <div>
              <h3>Items</h3>
              <br/>
              <div className="table-headers  order-items">
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
              {order.item.map((item) => 
                Object.keys(item.quantity).map((key)=>
                  <OrderItem key={`${item.itemRef} ${key}`} item={item} quantity={key.value} size={key}/>
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
                  {order.subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
                </h3>
              </div>
              <div className='order-total-details'>
                <h3>
                  Tax:
                </h3>
                <h3 className='order-number'>
                  {order.tax.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
                </h3>
              </div>
              <div className='order-total-details'>
                <h2>
                  Total:
                </h2>
                <h2 className='order-number'>
                  {order.total.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
                </h2>
              </div>
            </div>
          </div>
        </>
        :
        <>
          <div className='fields'>
            <div className='customer-subdetails'>
              <div className="fields">
                <h3>
                  Customer Name:
                </h3>
                <p>{order.customer.name}</p>
              </div>
              <div className="fields right-align">
                <h3>
                  Status:
                </h3>
                <p>
                  {order.status}
                </p>
              </div>
              <div className="fields right-align">
                <h3>
                  Order #:
                </h3>
                <p>
                  {order.id}
                </p>
              </div>
            </div>
            <br/>
            <div className='customer-subdetails'>
              <div className="fields">
                <h3>
                  Address:
                </h3>
                <p>{order.customer.address.address}</p>
                <h3>
                  Province:
                </h3>
                <p>{order.customer.address.province}</p>
              </div>
              <div className="fields">
                <h3>
                  City:
                </h3>
                <p>{order.customer.address.city}</p>
                <h3>
                  Postal Code:
                </h3>
                <p>{order.customer.address.postal}</p>
              </div>
            </div>
            <br/>
            <div>
              <h3>Items</h3>
              <br/>
              <div className="table-headers  order-items">
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
              {order.item.map((item) => 
                Object.keys(item.quantity).map((key)=>
                  <OrderItem key={`${item.itemRef} ${key}`} item={item} quantity={key.value} size={key}/>
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
                  {order.subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
                </h3>
              </div>
              <div className='order-total-details'>
                <h3>
                  Tax:
                </h3>
                <h3 className='order-number'>
                  {order.tax.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
                </h3>
              </div>
              <div className='order-total-details'>
                <h2>
                  Total:
                </h2>
                <h2 className='order-number'>
                  {order.total.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
                </h2>
              </div>
            </div>
          </div>
        </>}
        <div>
        {isEditing? 
          <>
            <button onClick={handleSave}>Save</button>
          </>
          :
          null }
        </div>
      </div>
    </div>
  )
}
