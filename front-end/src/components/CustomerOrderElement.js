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
    <div className="orders-section">
      {info.map((order) => (
        <button
          className="button-to-order"
          type="button"
          key={ order.id }
          onClick={ () => navigate(`/customer/orders/${order.id}`) }
        >
          <p
            className="order-id"
            data-testid={ `customer_orders__element-order-id-${order.id}` }
          >
            <p>Pedido</p>
            {`${order.id}`}
          </p>
          <p
            className="order-status"
            data-testid={ `customer_orders__element-delivery-status-${order.id}` }
          >
            {`${order.status}`}
          </p>
          <div className="data-field">
            <p
              className="info-p"
              data-testid={ `customer_orders__element-order-date-${order.id}` }
            >
              {moment(`${order.saleDate}`).format('DD/MM/YYYY')}
            </p>
            <p
              className="info-p"
              data-testid={ `customer_orders__element-card-price-${order.id}` }
            >
              {`R$ ${order.totalPrice.replace('.', ',')}`}
            </p>
          </div>
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
