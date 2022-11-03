import React from 'react';
import { useNavigate } from 'react-router-dom';

function Item({item, id}) {
  const history = useNavigate()
  
  function handleClick() {
    history(`/dashboard/inventory/${id}`)
  }

  return (
    <div onClick={handleClick} className='table-headers inventory-headers inventory-items'>
      <p>
        {item.name}
      </p>
      <p className='sizes'>
        {item.category}
      </p>
      <p className='sizes'>
        {item.price.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
      </p>
      <p className='sizes'>
        {item.cost.toLocaleString('en-US', { style: 'currency', currency: 'USD'})}
      </p>
      <div className='size-container sizes'>
        <p>
            {item.quantity.small}
        </p>
        <p>
            {item.quantity.medium}
        </p>
        <p>
            {item.quantity.large}
        </p>
        <p>
            {item.quantity.xlarge}
        </p>
      </div>
    </div>
  )
}

export default Item