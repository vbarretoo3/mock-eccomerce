import React, {useCallback, useEffect, useRef, useState} from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import {db} from '../../../../context/Firebase';
import LineItem from './LineItem'
import { useNavigate } from 'react-router-dom';

export default function AddOrder() {
  const customerRef = useRef()
  const orderRef = useRef()
  const [size, setSize] = useState('')
  const statusRef = useRef()
  const [orders, setOrders] = useState(null)
  const ordersLoc = collection(db, 'orders')
  const [customers, setCustomers] = useState(null)
  const custsLoc = collection(db, 'customers')
  const [customerInfo, setCustomerInfo] = useState(null)
  const itemsLoc = collection(db, 'inventory')
  const [items, setItems] = useState(null)
  const [selectedItems, setSelectedItems] = useState([])
  const [index, setIndex] = useState(1)
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)
  const history = useNavigate()

  const docSnap = async() => {
    const custArr = []
    const ordersArr = []
    const itemsArr = []
    const snapshot = await getDocs(custsLoc)
    snapshot.forEach((doc) => custArr.push({id:doc.id, data: doc.data()}))
    setCustomers(custArr)
    const ordersnap = await getDocs(ordersLoc)
    ordersnap.forEach((doc) => ordersArr.push({id:doc.id, data: doc.data()}))
    setOrders(ordersArr)
    const itemsnap = await getDocs(itemsLoc)
    itemsnap.forEach((item) => itemsArr.push({id:item.id, data:item.data()}))
    setItems(itemsArr)
  }

  function handleSelect(info) {
    const custID = info.split(',')[1]
    for (let i in customers) {
      if (customers[i].id === custID) {
        setCustomerInfo(customers[i])
      }
    }
  }

  useEffect(() => {
    console.log(selectedItems)
  }, [selectedItems])

  const CustomerDetails = useCallback(() => {
    return(
      <>
        <div className="fields">
          <h3>
            Address:
          </h3>
          <p>
            {customerInfo.data.address.address}
          </p>
          <h3>
            Province:
          </h3>
          <p>
            {customerInfo.data.address.province}
          </p>
        </div>
        <div className="fields">
          <h3>
            City:
          </h3>
          <p>
            {customerInfo.data.address.city}
          </p>
          <h3>
            Postal Code:
          </h3>
          <p>
            {customerInfo.data.address.postal}
          </p>
        </div>
      </>
    )
  }, [customerInfo])
  
  useEffect(() => {
    docSnap()
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    const orderData = {
      customer: {
        customerRef: customerInfo.id,
        name: customerInfo.data.name,
        contact: customerInfo.data.contact,
        address: customerInfo.data.address
      },
      item: [selectedItems],
      id: Number(orderRef.current.innerText),
      status: statusRef.current.value,
      subtotal: subtotal,
      tax: tax,
      total: total
    }
    const docRef = await addDoc(collection(db, 'orders'), orderData)
    history(`/dashboard/orders/${docRef.id}`)
  }

  const ItemPrice = useCallback(() => {
    var subtotals = 0
    var taxs = 0
    var totals = 0
    if (selectedItems.length !== 0) { 
      var subtotals = (selectedItems.price * selectedItems.quantity[size]).toFixed(2)
      var taxs = (subtotals*.13).toFixed(2)
      var totals = (Number(subtotals)+Number(taxs))
      setTotal(Number(totals))
      setSubtotal(Number(subtotals))
      setTax(Number(taxs))
    }

    return(
        <>
          <div className='order-total-details'>
            <h3>
              Subtotal:
            </h3>
            <div>
                ${subtotals}
            </div>
          </div>
          <div className='order-total-details'>
            <h3>
              Tax:
            </h3>
            <div>
                ${taxs}
            </div>
          </div>
          <div className='order-total-details'>
            <h2>
              Total:
            </h2>
            <div>
                ${totals}
            </div>
          </div>
        </>
    )
  }, [selectedItems])

  if (customers === null) return null
  if (orders === null) return null
  if (items === null) return null

  return (
    <div className="dash">
      <div className='customer-detail-container'>
        <div className='fields'>
          <form type='Submit' onSubmit={handleSubmit}>
            <div className='customer-subdetails'>
              <div className="fields">
                <h3>
                  Customer Name:
                </h3>
                <select required onChange={() => handleSelect(customerRef.current.value)} className='vendor-selector' ref={customerRef} defaultValue=''>
                  <option disabled hidden value='' >Select a Customer</option>
                  {customers.map((customer) =>
                  <option key={customer.id} value={[customer.data.name, customer.id]}>{customer.data.name}</option>
                  )}
                </select>
              </div>
              <div style={{justifyContent: 'center'}} className="fields right-align">
                <h3>
                  Status:
                </h3>
                <select className='vendor-selector' ref={statusRef} defaultValue='New'>
                  <option value='New'>New</option>
                  <option value='fulfilled'>fulfilled</option>
                  <option value='Shipped'>Shipped</option>
                  <option value='Canceled'>Canceled</option>
                  <option value='Complete'>Complete</option>
                </select>
              </div>
              <div className="fields right-align">
                <h3>
                  Order #:
                </h3>
                <p ref={orderRef}>{orders.length + 1}</p>
              </div>
            </div>
            <br/>
            <div className='customer-subdetails'>
              {customerInfo && <CustomerDetails />}
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
              <div className='table-headers order-items'>
              <LineItem currentSize={setSize} selectedItems={setSelectedItems} setIndex={setIndex} index={index} items={items} />
              </div>
            </div>
            <br/>
            <div className='order-total'>
              <ItemPrice />
            </div>
            <div>
              <button type='Submit'>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
