import React from 'react'

function Navbar() {
  return (
    <>
        <h2 className='navbar-title'>Menu</h2>
        <nav className='navbar'>
            <ul className='navbar-list'>
                <li>
                    <a className='navbar-item' href='/login'>Log in</a>
                </li>
                <li>
                    <a className='navbar-item' href='/login'>Log in</a>
                </li>
                <li>
                    <a className='navbar-item' href='/login'>Log in</a>
                </li>
            </ul>
        </nav>
    </>
  )
}

export default Navbar