import React from 'react';
import '../style/components/header.css';

export default function Header() {
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
        Cicrano da Silva
      </div>
      <button
        className="exit-btn"
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
      >
        SAIR
      </button>
    </header>
  );
}
