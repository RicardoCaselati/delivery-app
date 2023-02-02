import React, { useEffect, useState } from 'react';
import '../style/components/header.css';

export default function CustomerOrdersElement() {
  const [info, setInfo] = useState([]);

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem('user'));
    fetch(
      `http://localhost:3001/sales/user/${id}`,
      { method: 'GET' },
    ).then((res2) => res2.json()).then((json) => setInfo(json.message));
  }, []);

  return (
    <div>
      { info.map((order) => (
        <div key={ order }>
          <p data-testid="customer_orders__element-order-id-<id>">
            {`pedido N°: ${order.id}`}
          </p>
          <p data-testid="customer_orders__element-delivery-status-<id>">
            {`Status: ${order.status}`}
          </p>
          <p data-testid="customer_orders__element-order-date-<id>">
            {`data do pedido : ${order.saleDate}`}
          </p>
          <p data-testid="customer_orders__element-card-price-<id>">
            {`valor total: ${order.totalPrice}`}
          </p>
        </div>
      )) }
    </div>

  );
}

/*
<div key={ index }>
  <p data-testid="customer_orders__element-order-id-<id>">
    {`pedido N°: ${order.id}`}
  </p>
  <p data-testid="customer_orders__element-delivery-status-<id>">
    {`Status: ${order.status}`}
  </p>
  <p data-testid="customer_orders__element-order-date-<id>">
    {`data do pedido : ${order.id}`}
  </p>
  <p data-testid="customer_orders__element-card-price-<id>">
    {`valor total: ${order.id}`}
  </p>
</div>
*/
