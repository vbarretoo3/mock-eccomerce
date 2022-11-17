import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {useAuth} from '../context/AuthContext';
import { db } from '../context/Firebase';
import { getDocs, collection } from 'firebase/firestore'

function Navbar() {
    const history = useNavigate()
    const {currentUser} = useAuth()
    const {logout} = useAuth()
    const [customers, setCustomers] = useState(null)
    var permission = null
    const customerArr = []
    const snap = async () => {
        const snapshot = await getDocs(collection(db, 'customers'))
        snapshot.forEach((doc) => customerArr.push({id: doc.id, data: doc.data()}))
        setCustomers(customerArr)
        
    }

    useEffect(() => {
        snap()
    }, [])
  
    function handleLogout() {
      logout()
      history('/')
    }

    if (customers === null) return null

    console.log(currentUser)

    if (currentUser !== null){
        for (let x of customers) {
            if (currentUser.uid === x.id) {
                if (x.data.status === 'staff') {
                    permission = true
                }
            }
        }
    }

    return (
        <>
            <h2 className='navbar-title'>Menu</h2>
            <nav className='navbar'>
                <ul className='navbar-list'>
                    <h3>Profile</h3>
                    <li className='navbar-list-subgrid'>
                        {permission && <a className='navbar-item' href='/dashboard/customers'>Dashboard</a>}
                        {!currentUser?
                        <a className='navbar-item' href='/login'>Log In</a>:
                        <button className='navbar-button' onClick={handleLogout}>Log Out</button>}
                        <a className='navbar-item' href='/forgot-password'>Forgot Password</a>
                        <a className='navbar-item' href='/profile'>Profile</a>
                    </li>
                    <h3>Purchase</h3>
                    <li className='navbar-list-subgrid'>
                        <a className='navbar-item' href='/cart'>Checkout</a>
                        <a className='navbar-item' href='/Contact'>Contact Us</a>
                        <a className='navbar-item' href='/order'>Previous Orders</a>
                    </li>
                    <h3>Collections</h3>
                    <li className='navbar-list-subgrid'>
                        <a className='navbar-item' href='/Shirt'>Shirts</a>
                        <a className='navbar-item' href='/Pants'>Pants</a>
                        <a className='navbar-item' href='/Hoodie'>Hoodie</a>
                        <a className='navbar-item' href='/Hat'>Hat</a>
                        <a className='navbar-item' href='/Jacket'>Jacket</a>
                    </li>
                    <h3>About</h3>
                    <li className='navbar-list-subgrid'>
                        <a className='navbar-item' href='/about'>About Us</a>
                        <a className='navbar-item' href='/careers'>Careers</a>
                        <a className='navbar-item' href='/faq'>FAQ</a>
                    </li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar