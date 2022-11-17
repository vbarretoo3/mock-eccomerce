import React from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';

function Footer() {
  const history = useNavigate()
  const {currentUser} = useAuth()
  const {logout} = useAuth()

  function handleLogout() {
    logout()
    history('/')
  }

  return (
    <div className='footer-container'>
      <nav>
        <ul className='footer-grid'>
          <div className='footer-subgrid'>
            <h2>About</h2>
            <li className='footer-subgrid-footer'>
              <a href='/about'>About Us</a>
              <a href='/careers'>Careers</a>
              <a href='/faq'>FAQ</a>
            </li>
          </div>
          <div className='footer-subgrid'>
            <h2>Profile</h2>
            <li className='footer-subgrid-footer'>
              {!currentUser?
              <>
                <a href='/login'>Log In</a>
                <a href='/signup'>Sign Up</a>
              </>:
              <button className='footer-button' onClick={handleLogout}>Log Out</button>}
              <a href='/forgot-password'>Forgot Password</a>
              <a href='/profile'>Profile</a>
            </li>
          </div>
          <div className='footer-subgrid'>
            <h2>Collections</h2>
            <li className='footer-subgrid-footer'>
              <a href='/Shirt'>Shirts</a>
              <a href='/Pants'>Pants</a>
              <a href='/Hoodie'>Hoodie</a>
              <a href='/Hat'>Hat</a>
              <a href='/Jacket'>Jacket</a>
            </li>
          </div>
          <div className='footer-subgrid'>
            <h2>Purchase</h2>
            <li className='footer-subgrid-footer'>
              <a href='/cart'>Checkout</a>
              <a href='/Contact'>Contact Us</a>
              <a href='/orders'>Previous Orders</a>
            </li>
          </div>
        </ul>
      </nav>
      <div>
        <p>© Copyright 2022 Mock E-commerce. All rights reserved.</p>
      </div>
    </div>

  )
}

export default Footer