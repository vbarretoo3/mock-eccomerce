import React, { useState } from 'react';
import { MdMenu, MdClose } from 'react-icons/md';
import Navbar from './Navbar';
import { useNavigate } from 'react-router-dom'

function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const history = useNavigate()

  function handleMenu() {
    if (isOpen === false) {
      setIsOpen(true)  
    } else {
      setIsOpen(false)
    }
  }

  function handleClick(){
    history('/')
  }

  return (
    <>
      <div className='header-container'>
        <img src="/" alt='LOGO' className='logo' onClick={() => handleClick()}/>
        {isOpen === true ? <MdClose className='menu-icon' onClick={handleMenu}/> : <MdMenu className='menu-icon' onClick={handleMenu}/>}
      </div>
      <div className={isOpen === true ? 'show-menu': 'hide-menu'}>
        <Navbar />
      </div>
    </>
  )
}

export default Header