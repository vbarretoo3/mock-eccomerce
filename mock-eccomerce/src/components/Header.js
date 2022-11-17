import React, { useState, useCallback } from 'react';
import { MdMenu, MdClose, MdOutlineShoppingCart } from 'react-icons/md';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom'

function Header({update}) {
  const [isOpen, setIsOpen] = useState(false)
  const history = useNavigate()

  function handleMenu() {
    if (isOpen === false) {
      setIsOpen(true)  
    } else {
      setIsOpen(false)
    }
  }

  const Counter = useCallback(() => {
    const ref = JSON.parse(localStorage.getItem('cart'))

    if (ref === null) return null
    const count = ref.length
    return(
      <>
        <div className='cart-counter'>
          <div className='cart-counter-inner'>
            <p className='cart-counter-inner-inner'>
              {count}
            </p>
          </div>
        </div>
      </>
    )
  },[update])

  function handleClick(){
    history('/')
  }

  return (
    <>
      <div className='header-container'>
        <img src="https://www.creativefabrica.com/wp-content/uploads/2021/06/29/Gradient-ecommerce-logo-Online-shop-Graphics-14011541-1-580x386.png" alt='LOGO' className='logo' onClick={() => handleClick()}/>
        <div className='icons'>
          <div className='cart-icons' onClick={() => {history('/cart')}}>
            <Counter />
            <MdOutlineShoppingCart className='shop-cart' />
          </div>
          <div className='cart-icons'>
            {isOpen === true ? <MdClose className='menu-icon' onClick={handleMenu}/> : <MdMenu className='menu-icon' onClick={handleMenu}/>}
          </div>
        </div>
      </div>
      <div className={isOpen === true ? 'show-menu': 'hide-menu'}>
        <Navbar />
      </div>
    </>
  )
}

export default Header