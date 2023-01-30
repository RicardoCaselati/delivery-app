import React from 'react';
import '../style/components/header.css';
import { useNavigate } from 'react-router-dom';
import { string } from 'prop-types';

export default function Header({ name }) {
  const navigate = useNavigate();

  function handleLogout() {
    navigate('/login');
    localStorage.removeItem('user');
  }

  function routeToOrders() {
    navigate('/customer/orders');
    fetch(
      'http://localhost:3001/sellers',
    ).then((res2) => res2.json()).then((json) => {
      setSellers(json.message);
      setSellerName(json.message[0].name);
    });
  }

  return (
    <header className="header">
      <div
        className="item-1"
        data-testid="customer_products__element-navbar-link-products"
      >
        PRODUTOS
      </div>
      <div
        className="item-2"
        onClick={ routeToOrders }
        data-testid="customer_products__element-navbar-link-orders"
      >
        MEUS PEDIDOS
      </div>
      <div
        className="item-3"
        data-testid="customer_products__element-navbar-link-orders"
      />
      <div
        className="full-name-display"
        data-testid="customer_products__element-navbar-user-full-name"
      >
        { name }
      </div>
      <button
        className="exit-btn"
        onClick={ handleLogout }
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
      >
        SAIR
      </button>
    </header>
  );
}

Header.propTypes = {
  name: string,
}.isRequired;
