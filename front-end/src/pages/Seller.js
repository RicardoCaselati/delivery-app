import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Seller() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const sellerId = JSON.parse(localStorage.getItem('seller')).id;

    fetch(`http://localhost:3001/sales/${sellerId}`).then((response) => response.json()).then((json) => setOrders(json));
  }, []);

  return (
    <div>
      <header>
        <div data-testid="customer_products__element-navbar-link-orders" />
        <div data-testid="customer_products__element-navbar-user-full-name" />
        <div data-testid="customer_products__element-navbar-link-logout" />
      </header>
      <div>
        {orders.map((order, index) => (
          <div key={ index }>
            <Link
              to={ `${order.id}` }
              data-testid={ `seller_orders__element-order-id-${order.id}` }
            >
              {order.id}
            </Link>
            <div
              data-testid={ `seller_orders__element-delivery-status-${order.status}` }
            >
              {order.status}
            </div>
            <div
              data-testid={ `seller_orders__element-order-date-${order.date}` }
            >
              {order.saleDate}
            </div>
            <div
              data-testid={ `seller_orders__element-card-price-${order.price}` }
            >
              {order.totalPrice}
            </div>
            <div
              data-testid={ `seller_orders__element-card-address-${order.address}` }
            >
              {`${order.deliveryAddress}, ${order.deliveryNumber}`}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
