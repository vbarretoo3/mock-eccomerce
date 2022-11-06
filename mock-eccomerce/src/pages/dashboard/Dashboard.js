import React from 'react';
import DashSidebar from './DashSidebar';
import Customers from './customers/Customers';
import Cust from './customers/Cust';
import Vendors from './vendors/Vendors';
import Vend from './vendors/Vend';
import Orders from './orders/Orders';
import Ord from './orders/Ord';
import PurchaseOrders from './purchaseorders/PurchaseOrders';
import Purch from './purchaseorders/Purch';
import Inventory from './inventory/Inventory';
import Invent from './inventory/Invent';
import AddCustomer from './newelements/customer/AddCustomer';
import AddItem from './newelements/item/AddItem';
import AddOrder from './newelements/order/AddOrder';
import AddPo from './newelements/po/AddPo';
import AddVendor from './newelements/vendor/AddVendor';
import { Routes, Route } from 'react-router-dom';

export default function Dashboard() {
  return (
    <>
      <div className='dashboard-container'>
        <div className='empty-div'>
          <DashSidebar />
        </div>
        <div>
          <div>
            <Routes>
              <Route path='/' element={<Customers />} />
              <Route path='customers' element={<Customers />} />
              <Route path='customers/add' element={<AddCustomer />} />
              <Route path='customers/:id' element={<Cust />} />
              <Route path='vendors' element={<Vendors />} />
              <Route path='vendors/add' element={<AddVendor />} />
              <Route path='vendors/:id' element={<Vend />} />
              <Route path='orders' element={<Orders />} />
              <Route path='orders/add' element={<AddOrder />} />
              <Route path='orders/:id' element={<Ord />} />
              <Route path='po' element={<PurchaseOrders />} />
              <Route path='po/add' element={<AddPo />} />
              <Route path='po/:id' element={<Purch />} />
              <Route path='inventory' element={<Inventory />} />
              <Route path='inventory/add' element={<AddItem />} />
              <Route path='inventory/:id' element={<Invent />} />
            </Routes>
          </div>
        </div>
      </div>
    </>
  )
}
