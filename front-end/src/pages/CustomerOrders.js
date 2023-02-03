import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import CustomerOrdersElement from '../components/CustomerOrderElement';
import '../style/pages/orders.css';

export default function CustomerOrders() {
  const [username, setUsername] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('username');
    setUsername(name);
  }, []);

  return (
    <div className="orders-content">
      <Header name={ username } />
      <CustomerOrdersElement />
    </div>
  );
}
