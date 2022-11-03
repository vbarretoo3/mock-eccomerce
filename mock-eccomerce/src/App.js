import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './style/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home/Home';
import Dashboard from './pages/dashboard/Dashboard';
import Cart from './pages/cart/Cart';

function App() {
  return (
    <>
      <div className='app-container'>
        <Header />
        <div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/cart" element={<Cart />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </>
  );
}

export default App;
