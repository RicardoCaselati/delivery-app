import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Header from '../components/Header';
import SaleCart from '../components/SaleCart';
import '../style/pages/orderDetails.css';

const prefix = 'customer_order_details__';

export default function OrderDetailsById() {
  const { id } = useParams();
  const [order, setOrder] = useState([]);

  useEffect(() => {
    fetch(
      `http://localhost:3001/sales/${id}`,
    ).then((res) => res.json()).then((json) => {
      setOrder(json.message);
    });
  }, [setOrder]);
  const [sale] = order;

  return (
    <div className="details-page-content">
      <Header />
      <h1 className="details-title">
        Detalhes do pedido
      </h1>
      {sale && (
        <div className="details-info">

          <div className="details-header">
            <p data-testid={ `${prefix}element-order-details-label-order-id` }>
              PEDIDO:
              {' '}
              {sale.id}
            </p>
            <p data-testid={ `${prefix}element-order-details-label-seller-name` }>
              P. Vend:
              {' '}
              {sale.seller.name}
            </p>
            <p data-testid={ `${prefix}element-order-details-label-order-date` }>
              { moment(`${sale.saleDate}`).format('DD/MM/YYYY') }
            </p>
            <p
              data-testid={
                `${prefix}element-order-details-label-delivery-status${sale.id}`
              }
            >
              {sale.status}
            </p>
            <button
              className="delivered-btn"
              data-testid={ `${prefix}button-delivery-check` }
              type="button"
              disabled
            >
              Marcar como entregue
            </button>
          </div>
          <SaleCart
            cart={ sale.products }
          />
          <p data-testid={ `${prefix}element-order-total-price` }>
            {`Total: R$${sale.totalPrice.replace('.', ',')}`}
          </p>
        </div>
      )}
    </div>
  );
}
