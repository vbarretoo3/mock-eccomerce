import React, { useState } from 'react';
import {Routes, Route} from 'react-router-dom';
import './style/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Cart from './pages/cart/Cart';
import Collection from './pages/collection/Collection';
import Item from './pages/item/Item';
import About from './pages/about/About';
import Careers from './pages/careers/Careers';
import Contact from './pages/contact/Contact';
import FAQ from './pages/faq/FAQ';
import Forgot from './pages/forgot-password/Forgot';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Signup from './pages/signup/Signup';
import Info from './pages/signup/Info';
import Orders from './pages/orders/Orders';
import PrivateRoute from './context/PrivateRoute';
import PrivateStaff from './context/PrivateStaff';
import { AuthProvider } from './context/AuthContext';

function App() {
  const [masterUpdate, setMasterUpdate] = useState(0)
  return (
    <>
      <div className='app-container'>
        <AuthProvider>
          <Header update={masterUpdate} />
          <div>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/:id" element={<Collection />} />
              <Route path="/:id/:div" element={<Item setMasterUpdate={setMasterUpdate}/>} />
              <Route path="/dashboard/*" element={
                <PrivateRoute>
                  <PrivateStaff>
                    <Dashboard />
                  </PrivateStaff>
                </PrivateRoute>
              } />
              <Route path="/cart" element={<Cart />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/careers" element={<Careers />} />
              <Route path="/forgot" element={<Forgot />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/login" element={<Login />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/profile" element={<PrivateRoute><Profile /></PrivateRoute>} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/info" element={<Info />} />
            </Routes>
          </div>
          <Footer />
        </AuthProvider>
      </div>
    </>
  );
}

export default App;
