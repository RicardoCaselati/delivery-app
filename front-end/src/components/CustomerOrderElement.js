import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { useNavigate } from 'react-router-dom';
import '../style/components/header.css';

export default function CustomerOrdersElement() {
  const [info, setInfo] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const { id } = JSON.parse(localStorage.getItem('user'));
    fetch(
      `http://localhost:3001/sales/user/${id}`,
      { method: 'GET' },
    ).then((res2) => res2.json()).then((json) => setInfo(json.message));
  }, []);

  return (
    <div>
      {info.map((order) => (
        <button
          type="button"
          key={ order }
          onClick={ () => navigate(`/customer/orders/${order.id}`) }
        >
          <p data-testid={ `customer_orders__element-order-id-${order.id}` }>
            {`pedido N°: ${order.id}`}
          </p>
          <p data-testid={ `customer_orders__element-delivery-status-${order.id}` }>
            {`Status: ${order.status}`}
          </p>
          <p data-testid={ `customer_orders__element-order-date-${order.id}` }>
            {moment(`${order.saleDate}`).format('DD/MM/YYYY')}
          </p>
          <p data-testid={ `customer_orders__element-card-price-${order.id}` }>
            {`${order.totalPrice.replace('.', ',')}`}
          </p>
        </button>
      ))}
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
