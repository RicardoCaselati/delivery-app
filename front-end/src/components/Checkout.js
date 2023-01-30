import React from 'react';
import '../style/components/checkout.css';
import { number } from 'prop-types';
import { useNavigate } from 'react-router-dom';

export default function Checkout({ totalPrice }) {
  const navigate = useNavigate();

  return (
    <div
      style={ { position: 'fixed', bottom: '100px', right: '100px', zIndex: 1 } }
      data-testid="customer_products__button-cart"
    >
      <button
        className="checkout"
        data-testid="customer_products__button-cart"
        type="button"
        disabled={ totalPrice === 0 }
        onClick={ () => navigate('/customer/checkout') }
      >
        <span
          data-testid="customer_products__checkout-bottom-value"
        >
          {`${totalPrice.toFixed(2).replace('.', ',')}`}
        </span>
      </button>
    </div>
  );
}

Checkout.propTypes = {
  totalPrice: number.isRequired,
};
