import React from 'react';
import { useNavigate } from 'react-router-dom';

function Customer({item, id}) {
  const history = useNavigate()
  
  function handleClick() {
    history(`/dashboard/customers/${id}`)
  }

  return (
    <div onClick={handleClick} className='customer-container'>
      <div>
        <p>
          {item.name}
        </p>
      </div>
      <div>
        <p className='sizes'>
          {item.contact.email}
        </p>
      </div>
      <div className='sizes'>
        <p>
          {item.address.address}
        </p>
      </div>
    </div>
  )
}

export default Customer