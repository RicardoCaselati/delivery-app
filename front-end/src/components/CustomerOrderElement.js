import React, { useEffect } from 'react';
import '../style/components/header.css';
// import { useNavigate } from 'react-router-dom';
// import { string } from 'prop-types';

export default function CustomerOrdersElement() {
  useEffect(() => {
    fetch(
      'http://localhost:3001/sales',
    ).then((res2) => res2.json()).then((json) => {
      console.log(json);
    });
  }, []);

  return (
    <div>
      <span data-testid="customer_orders__element-order-id-<id>">Pedido Nº</span>
      <span data-testid="customer_orders__element-delivery-status-<id>">status</span>
      <span data-testid="customer_orders__element-order-date-<id>">data</span>
      <span data-testid="customer_orders__element-card-price-<id>">valor total</span>
    </div>
  );
}
