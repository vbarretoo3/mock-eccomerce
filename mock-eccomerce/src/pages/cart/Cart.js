import { collection, getDocs } from 'firebase/firestore';
import React, { useCallback, useEffect, useState } from 'react';
import { db } from '../../context/Firebase.js';
import {MdClose} from 'react-icons/md'
import { useNavigate } from 'react-router-dom';

export default function Cart() {
  const history = useNavigate()
  const cart = JSON.parse(localStorage.getItem('cart'))
  const [inventory, setInventory] = useState(null)
  const [update, setUpdate] = useState(0)
  const inventoryArr = []
  const finalItems = []
  const snap = async () => {
    const docSnap = await getDocs(collection(db, 'inventory')) 
    docSnap.forEach((doc) => 
      inventoryArr.push({id: doc.id, data: doc.data()
    }))
    setInventory(inventoryArr)
  }

  useEffect(() => {
    snap()
  }, [])

  function removeItem(item){
    cart.splice(item.index, 1)
    localStorage.setItem('cart', JSON.stringify(cart))
    console.log(cart)
    setUpdate((currState) => currState + 1)
    
  }

  const OrderDetails = useCallback(() => {
    if (inventory === null) return null
    var subtotals = 0
    for (let i of cart) {
      subtotals += (i.quantity * i.price)

    }

    return (
      <div className='order-subdetails'>
        <div className='flex'>
          <h3>Subtotal:</h3>
          <h3>$ {(subtotals).toFixed(2)}</h3>
        </div>
        <div className='flex'>
          <h3>Tax:</h3>
          <h3>$ {(subtotals*.13).toFixed(2)}</h3>
        </div>
        <div className='flex'>
          <h3>Total:</h3>
          <h3>$ {(subtotals*1.13).toFixed(2)}</h3>
        </div>
      </div>
    )
  },[update, inventory, cart])

  const ItemInfo = useCallback((item, index) => {
    if (inventory === null) return null

    var itemDetails = []
    for(let i of inventory){
      if (i.id === item.item.id) {
        itemDetails = i
      }
    }

    const keys = Object.keys(itemDetails.data.quantity)

    return(
      <div className='cart-lines'>
        <p>{itemDetails.data.name}</p>
        <select className='vendor-selector' defaultValue={item.item.size}>
          {keys.map((key) => 
            <optgroup key={key}>
            {itemDetails.data.quantity[key] === 0 ? 
              <option key={key} value={key} disabled>{key}</option>:
              <option key={key} value={key}>{key}</option>
            }
            </optgroup>
          )}
        </select>
        <p>{item.item.quantity}</p>
        <p>$ {(Number(item.item.quantity)*Number(itemDetails.data.price)).toFixed(2)}</p>
        <MdClose onClick={() => removeItem(item)} />
      </div>
    )
  }, [update, inventory, cart])

  function handleCheckout() {
    console.logß('checked')
  }

  if(inventory === null) return null
  if(cart === null) return history('/')

  return (
    <div className='order-container'>
      <h1>
        Cart
      </h1>
      <div className='order-grid'>
        <div className='cart-lines'>
          <h3>Name:</h3>
          <h3>size:</h3>
          <h3>qty:</h3>
          <h3>price:</h3>
        </div>
        {cart.map((item, index) => 
          <ItemInfo key={index} item={item} index={index}/>
        )}
      </div>
      <div className='order-subdetails'>
        <OrderDetails />
        <button onClick={handleCheckout} className='checkout-button'>Proceed to Checkout</button>
      </div>
    </div>
  )
}
