import React from 'react';
import { useNavigate } from 'react-router-dom';

function Order({item, id}) {
  const history = useNavigate()
  
  function handleClick() {
    history(`/dashboard/orders/${id}`)
  }

  return (
    <div onClick={handleClick}  className='table-headers order-headers inventory-items'>
      <p>
        {item.id}
      </p>
      <p className='sizes'>
        {item.status}
      </p>
      <p className='sizes'>
        {item.customer.name}
      </p>
      <p className='sizes'>
        {item.subtotal.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
      </p>
      <p className='sizes'>
        {item.tax.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
      </p>
      <p className='sizes'>
        {item.total.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
      </p>
    </div>
  )
}

export default Order