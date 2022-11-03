import React from 'react';
import {Outlet, NavLink} from 'react-router-dom';

function DashSidebar() {
  return (
    <>
        <nav className='sidebar-container'>
            <ul className='sidebar-grid'>
                <li className='sidebar-item'>
                    <NavLink className='sidebar' to='/dashboard/customers'>Customers</NavLink>
                </li>
                <li className='sidebar-item'>
                    <NavLink className='sidebar' to='/dashboard/vendors'>Vendors</NavLink>
                </li>
                <li className='sidebar-item'>
                    <NavLink className='sidebar' to='/dashboard/orders'>Orders</NavLink>
                </li>
                <li className='sidebar-item'>
                    <NavLink className='sidebar' to='/dashboard/po'>Purchase Orders</NavLink>
                </li>
                <li className='sidebar-item'>
                    <NavLink className='sidebar' to='/dashboard/inventory'>Inventory</NavLink>
                </li>
            </ul>
        </nav>
        <Outlet/>
    </>
  )
}

export default DashSidebar