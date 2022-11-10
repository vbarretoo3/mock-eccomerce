import React, {useCallback, useEffect, useRef, useState} from 'react';
import { collection, getDocs, addDoc } from 'firebase/firestore';
import {db} from '../../../../context/Firebase';
import LineItem from './LineItem'
import { useNavigate } from 'react-router-dom';

export default function AddOrder() {
  const customerRef = useRef()
  const orderRef = useRef()
  const statusRef = useRef()
  const [orders, setOrders] = useState(null)
  const ordersLoc = collection(db, 'orders')
  const [customers, setCustomers] = useState(null)
  const custsLoc = collection(db, 'customers')
  const [customerInfo, setCustomerInfo] = useState(null)
  const itemsLoc = collection(db, 'inventory')
  const [items, setItems] = useState(null)
  const [count, setCount] = useState(0)
  const [selectedItems, setSelectedItems] = useState(null)
  const item = {
    category: '',
    itemRef: '',
    name: '',
    price: 0,
    quantity: ''
  }
  const [subtotal, setSubtotal] = useState(0)
  const [tax, setTax] = useState(0)
  const [total, setTotal] = useState(0)
  const history = useNavigate()
  const [update, setUpdate] = useState(0)

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
    setSelectedItems([item])
  }, [])

  function addLine() {
    selectedItems.push(item)
    setUpdate((currState) => currState + 1)
  }

  function removeLine(index, setInfo) {
    selectedItems.splice(index, 1)
    console.log(selectedItems)
    if (selectedItems.length === 0) {
        setSelectedItems([item])
        setInfo(null)
    }
    setUpdate((currState) => currState - 1)
  }

  function updateinfo(items, loc) {
    selectedItems[loc] = items
  }

  async function handleSubmit(e) {
    e.preventDefault()
    const orderData = {
      customer: {
        customerRef: customerInfo.id,
        name: customerInfo.data.name,
        contact: customerInfo.data.contact,
        address: customerInfo.data.address
      },
      item: selectedItems,
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
    if (selectedItems[0].name !== '') {
      for (let i in selectedItems) {
        if ((selectedItems[i].quantity === undefined && selectedItems[i].price === undefined) || selectedItems[i].name === 0) {
          for (let c in items) {
            if (items[c].data.name === selectedItems[i].name){
              subtotals = subtotals + items[c].data.price
              taxs = (subtotals*.13)
              totals = (subtotals*1.13)
            }
          }
        } else if (selectedItems[i].quantity === undefined) {
          subtotals = 2
          taxs = (subtotals*.13)
          totals = (subtotals*1.13)
        } else if (selectedItems[i].price === undefined) {
          subtotals = 3
          taxs = (subtotals*.13)
          totals = (subtotals*1.13)
        } else if (selectedItems[i].name === undefined || selectedItems[i].quantity === '') {
          subtotals = subtotals + 0
          taxs = (subtotals*.13)
          totals = (subtotals*1.13)
        } else {
          var key = Object.keys(selectedItems[i].quantity)
          subtotals = (subtotals + (selectedItems[i].price * selectedItems[i].quantity[key[0]]))
          taxs = (subtotals*.13)
          totals = (subtotals*1.13)
        }
      }
    }
    setSubtotal(subtotals)
    setTax(taxs)
    setTotal(totals)

    return(
        <>
          <div className='order-total-details'>
            <h3>
              Subtotal:
            </h3>
            <div>
                ${subtotals.toFixed(2)}
            </div>
          </div>
          <div className='order-total-details'>
            <h3>
              Tax:
            </h3>
            <div>
                ${taxs.toFixed(2)}
            </div>
          </div>
          <div className='order-total-details'>
            <h2>
              Total:
            </h2>
            <div>
                ${totals.toFixed(2)}
            </div>
          </div>
        </>
    )
  }, [selectedItems, count, update])

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
              <div>
                {selectedItems.map((item, index) =>
                  <div key={index} className='table-headers order-items'>
                    <LineItem remove={removeLine} changes={setCount} currentItem={item} index={index} updateInfo={updateinfo} items={items} />
                  </div>
                )}
                <button type='button' onClick={addLine}>Add Line</button>
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
