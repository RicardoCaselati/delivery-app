import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Register from './components/RegisterForm';
import Login from './components/LoginForm';
import './style/app.css';
import Home from './pages/Home';
import Products from './pages/Products';
import CheckoutP from './pages/CheckoutP';
import OrderDetails from './pages/OrderDetails';
import Admin from './pages/Admin';
import Seller from './pages/Seller';
import SellerOrderDetails from './pages/SellerOrderDetails';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={ <Home /> } />
        <Route path="/login" element={ <Login /> } />
        <Route path="/register" element={ <Register /> } />
        <Route path="/customer/products" element={ <Products /> } />
        <Route path="/customer/checkout" element={ <CheckoutP /> } />
        <Route path="/customer/orders/:id" element={ <OrderDetails /> } />
        <Route path="/admin/manage" element={ <Admin /> } />
        <Route path="/seller/orders" element={ <Seller /> } />
        <Route path="/seller/orders/:saleId" element={ <SellerOrderDetails /> } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
