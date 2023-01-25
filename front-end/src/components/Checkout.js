import React from 'react';
import '../style/components/checkout.css';

export default function Checkout() {
  return (
    <div data-testid="customer_products__button-cart">
      <button
        className="checkout"
        data-testid="customer_products__checkout-bottom-value"
        type="button"
      >
        Ver Carrinho:
      </button>
    </div>
  );
}
