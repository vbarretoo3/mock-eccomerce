import React from 'react';
import { useNavigate } from 'react-router-dom';

function Vendor({item, id}) {
  const history = useNavigate()
  
  function handleClick() {
    history(`/dashboard/vendors/${id}`)
  }

  return (
    <div onClick={handleClick}  className='customer-container'>
      <div>
        <p>
          {item.name}
        </p>
      </div>
      <div className='fields'>
        <p>
          {item.contact.email}
        </p>
      </div>
      <div className='fields'>
        <p>
          {item.contact.phone}
        </p>
      </div>
      <div className='fields'>
        <a href={item.contact.website} target='_blank' rel='noopener' className='table-links'>
          {item.contact.website}
        </a>
      </div>
    </div>
  )
}

export default Vendor