import React from 'react';
import { useNavigate } from 'react-router-dom';

function PO({item, id}) {
  const history = useNavigate()
  
  function handleClick() {
    history(`/dashboard/po/${id}`)
  }

  return (
    <div onClick={handleClick} className='table-headers inventory-items po-headers'>
      <p>
        {item.id}
      </p>
      <p className='sizes'>
        {item.status}
      </p>
      <p className='sizes'>
        {item.vendor.name}
      </p>
      <div className='po-container'>
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
    </div>
  )
}

export default PO