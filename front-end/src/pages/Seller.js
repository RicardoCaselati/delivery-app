import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Seller() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const sellerId = JSON.parse(localStorage.getItem('seller')).id;

    fetch(`http://localhost:3001/sales/seller/${sellerId}`).then((response) => response.json()).then((json) => setOrders(json));
  }, []);

  const saveOrderInfo = (date, status, totalPrice) => {
    localStorage.setItem('orderDate', JSON.stringify(date));
    localStorage.setItem('orderStatus', status);
    localStorage.setItem('orderPrice', JSON.stringify(totalPrice));
  };

  return (
    <div>
      <header>
        <div data-testid="customer_products__element-navbar-link-orders" />
        <div data-testid="customer_products__element-navbar-user-full-name" />
        <div data-testid="customer_products__element-navbar-link-logout" />
      </header>
      <div>
        {orders.map((order, index) => (
          <Link
            onClick={
              () => saveOrderInfo(order.saleDate, order.status, order.totalPrice)
            }
            to={ `${order.id}` }
            key={ index }
          >
            <div
              data-testid={ `seller_orders__element-order-id-${order.id}` }
            >
              {order.id}
            </div>
            <div
              data-testid={ `seller_orders__element-delivery-status-${order.id}` }
            >
              {order.status}
            </div>
            <div
              data-testid={ `seller_orders__element-order-date-${order.id}` }
            >
              {order.saleDate}
            </div>
            <div
              data-testid={ `seller_orders__element-card-price-${order.id}` }
            >
              {order.totalPrice}
            </div>
            <div
              data-testid={ `seller_orders__element-card-address-${order.id}` }
            >
              {`${order.deliveryAddress}, ${order.deliveryNumber}`}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
