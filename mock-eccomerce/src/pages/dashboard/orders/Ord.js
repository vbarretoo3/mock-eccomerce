import { useNavigate, useParams } from "react-router-dom";
import React, {useEffect, useState, useRef, useCallback} from 'react';
import { collection, doc, getDoc, getDocs, updateDoc } from 'firebase/firestore';
import {db} from '../../../context/Firebase';
import {BsFillPencilFill} from  'react-icons/bs';
import {MdClose} from 'react-icons/md'
import OrderItem from './OrderItem'
import { nanoid } from "nanoid";
import LineItem from "./LineItem";

export default function Ord() {
  const id= useParams()
  const nameRef = useRef()
  const statusRef = useRef()
  const [isEditing, setIsEditing] = useState(false)
  const [customers, setCustomers] = useState(null)
  const [inventory, setInventory] = useState(null)
  const [update, setUpdate] = useState(0)
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)
  const [order, setOrder] = useState(null)
  const docRef = doc(db, 'orders', `${id.id}`)
  const history = useNavigate()

  const docSnap = async() => {
    await getDoc(docRef).then((doc) => setOrder(doc.data()))
    const custArr = []
    const custLoc = collection(db, 'customers')
    const custSnap = await getDocs(custLoc)
    custSnap.forEach((docSnap) => custArr.push({id: docSnap.id, data: docSnap.data()}))
    setCustomers(custArr)
    const itemArr = []
    const itemLoc = collection(db, 'inventory')
    const itemSnap = await getDocs(itemLoc)
    itemSnap.forEach((docSnap) => itemArr.push({id: docSnap.id, data: docSnap.data()}))
    setInventory(itemArr)
    setUpdate((currState) => currState + 1)
  }
  
  useEffect(() => {
    docSnap()
  }, [])

  function handleCustomerChange() {
    for (let x of customers) {
      if (x.id === nameRef.current.value) {
        order.customer.name = x.data.name
        order.customer.customerRef = x.id
        order.customer.address = x.data.address
        order.customer.contact = x.data.contact
      }
    }
    setUpdate((currState) => currState + 1)
  }

  function handleStatusChange() {
    order.status = statusRef.current.value
  }
  
  const CustomerDetails = useCallback(() => {
    return (
      <>
        <div className='customer-subdetails'>
          <div className="fields">
            <h3>
              Customer Name:
            </h3>
            <select className='vendor-selector' onChange={handleCustomerChange} defaultValue={order.customer.customerRef} ref={nameRef} required>
              {customers.map((customer) => 
                <option key={nanoid()} value={customer.id}>{customer.data.name}</option>
              )}
            </select>
          </div>
          <div className="fields right-align">
            <h3>
              Status:
            </h3>
            <select className='vendor-selector' onChange={handleStatusChange} ref={statusRef} defaultValue={order.status}>
              <option value='New'>New</option>
              <option value='Fulfilled'>Fulfilled</option>
              <option value='Shipped'>Shipped</option>
              <option value='Canceled'>Canceled</option>
              <option value='Complete'>Complete</option>
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
      </>
    )
  }, [update])

  const OrderDetails = useCallback(() => {
    order.subtotal = subtotal.toFixed(2)
    order.tax = tax.toFixed(2)
    order.total = total.toFixed(2)

    return (
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
    )
  },[update])

  function updateOrderDetails() {
    setSubtotal(0)
    setTax(0)
    setTotal(0)
    for (let x of order.item) {
      const key = Object.keys(x.quantity)[0]
      setSubtotal((currState) => currState + (x.price * x.quantity[key]))
      setTax((currState) => currState + ((x.price * x.quantity[key])* .13))
      setTotal((currState) => currState + ((x.price * x.quantity[key])* 1.13))
    }
  }

  function updateEditing() {
    setIsEditing(!isEditing)
    updateOrderDetails()
    setUpdate((currState) => currState + 1)
  }

  function removeItem(index) {
    order.item.splice(index, 1)
    if (order.item.length === 0) {
      const newItem = {
        vendorRef: '',
        name: '',
        category: 'Select an Item',
        price: 0,
        quantity: {'': 1}
      }
      order.item.push(newItem)
    }
    updateOrderDetails()
    setUpdate((currState) => currState + 1)
  }

  function addItem() {
    const newItem = {
      vendorRef: '',
      name: '',
      category: 'Select an Item',
      price: 0,
      quantity: {'': 1}
    }
    order.item.push(newItem)
    setUpdate((currState) => currState + 1)
  }

  if (order === null) return null
  if (customers === null) return null
  if (inventory === null) return null

  async function handleSave(e) {
    e.preventDefault()
    await updateDoc(docRef, order)
    history(0)
  }

  return (
    <div className="dash">
      <div className='customer-detail-container'>
        <div className="fields right-align icons" >
          {isEditing? <MdClose className="menu-icon" onClick={() => history(0)} />:
          <BsFillPencilFill className="menu-icon" onClick={() => updateEditing()} />}
        </div>
        {isEditing? 
        <>
          <form type='Submit' onSubmit={handleSave}>
            <div className='fields'>
              <CustomerDetails />
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
                {order.item.map((item, index) => 
                  <div key={nanoid()}>
                    <LineItem item={item} index={index} order={order} setUpdate={setUpdate} setSubtotal={setSubtotal} setTax={setTax} setTotal={setTotal} inventory={inventory} removeItem={removeItem}/>
                  </div>
                )}
                <button type="button" onClick={addItem}>Add Line</button>
              </div>
              <br/>
              <OrderDetails />
            </div>
            <button type="Submit">Save</button>
          </form>
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
              {order.item.map((item, index) => 
                <div key={nanoid()}>
                  {Object.keys(item.quantity).map((key)=> 
                    <div key={nanoid()}>
                      <OrderItem item={item} quantity={key.value} size={key}/>
                    </div>
                  )}
                </div>
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
      </div>
    </div>
  )
}
