import React from 'react'

export default function NonUserOrder() {
  function handleSubmit() {
    
  }

  return (
    <div>
        <form type='Submit' onSubmit={handleSubmit}>
            <label>Email</label>
            <input type="email" name="email" required/>
            <label>Order#</label>
            <input type="number" name="order" required/>
            <button className='contact-button' type="submit">Look for Order</button>
        </form>
    </div>
  )
}
