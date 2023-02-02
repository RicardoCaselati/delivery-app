import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import Header from '../components/Header';
import SaleCart from '../components/SaleCart';

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
  // console.log(order);
  const [sale] = order;

  return (
    <div>
      <Header />
      <h2>
        Detalhe do pedido
      </h2>
      {sale && (
        <div>
          <div>
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
              data-testid={ `${prefix}button-delivery-check` }
              type="button"
              disabled
            >
              Marcar como entregue
            </button>
          </div>
          <div>
            {/* {sale && sale.map(
              ({ id, name, price, urlImage }) => (
                <div key={ id }> */}
            <SaleCart
              cart={ sale.products }
            />
            {/* </div>
              ),
            )} */}
          </div>
          <p data-testid={ `${prefix}element-order-total-price` }>
            {sale.totalPrice.replace('.', ',')}
          </p>
        </div>
      )}
    </div>
  );
}
