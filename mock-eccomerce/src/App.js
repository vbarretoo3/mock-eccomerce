import React from 'react';
import {Routes, Route} from 'react-router-dom';
import './style/App.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/home/Home';

function App() {
  return (
    <>
      <Header />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      <Footer />
    </>
  );
}

export default App;
