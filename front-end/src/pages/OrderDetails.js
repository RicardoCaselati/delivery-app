import React, { useEffect, useState } from 'react';
import { number } from 'prop-types';
import Header from '../components/Header';

export default function OrderDetails({
  orderId,
  saleDate,
  status,
}) {
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState([]);
  const totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
  // const objectCheckout = JSON.parse(localStorage.getItem('checkoutObj'));

  useEffect(() => {
    const name = localStorage.getItem('username');
    setUsername(name);

    const cart = JSON.parse(localStorage.getItem('cart'));
    setProducts(cart);

    // const total = JSON.parse(localStorage.getItem('totalPrice'));
    // setTotalPrice(total);
  }, []);

  const dataTestId = 'customer_order_details__element-order-details-label';
  return (
    <div>
      <Header name={ username } />
      <h2>Detalhe do Pedido</h2>
      <div>
        <p
          data-testid="customer_order_details__element-order-details-label-order-<id>"
        >
          {`Pedido${orderId}`}
        </p>
        <p
          data-testid="customer_order_details__element-order-details-label-seller-name"
        >
          P. Vend: nome
        </p>
        <div
          data-testid={ `${dataTestId}-order-date` }
        >
          { saleDate }
        </div>
        <div
          data-testid={ `${dataTestId}'-delivery-status'` }
        >
          { status }
        </div>
        <div
          data-testid="customer_order_details__button-delivery-check"
        >
          marcar como entregue
        </div>
      </div>
      {/* <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            <th>Remover item</th>
          </tr>
        </thead> */}
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={ product.id }>
              <td
                data-testid={
                  `customer_order_details__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-name-${index}`
                }
              >
                {product.name}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-quantity-${index}`
                }
              >
                {product.qty}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-unit-price-${index}`
                }
              >
                {`${Number(product.price).toFixed(2).replace('.', ',')}`}
              </td>
              <td
                data-testid={
                  `customer_order_details__element-order-table-sub-total-${index}`
                }
              >
                {`${Number(product.totalPrice).toFixed(2).replace('.', ',')}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        data-testid="customer_order_details__element-order-total-price"
      >
        {`${totalPrice.toFixed(2).replace('.', ',')}`}
      </div>
    </div>
  );
}

OrderDetails.propTypes = {
  orderId: number,
  saleDate: number,
  status: number,
}.isRequired;
