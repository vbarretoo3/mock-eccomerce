import React from 'react';
import { useNavigate } from 'react-router-dom';

function OrderItem({item, size, quantity}) {
  const history = useNavigate()

  function handleClick() {
    history(`/dashboard/inventory/${item.itemRef}`)
  }

  return (
    <div onClick={handleClick} className='table-headers order-items details-border'>
        <p>
            {item.name}
        </p>
        <p className='sizes'>
            {item.category}
        </p>
        <p className='sizes'>
            {size}
        </p>
        <p className='sizes'>
            {item.quantity[size]}
        </p>
        <p className='sizes'>
            {(Number(item.price)*Number(item.quantity[size])).toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
        </p>
        <p>
            ${((Number(item.price)*Number(item.quantity[size]))*.13).toFixed(2)}
        </p>
        <p>
            ${((Number(item.price)*Number(item.quantity[size]))*1.13).toFixed(2)}
        </p>
    </div>
  )
}

export default OrderItem