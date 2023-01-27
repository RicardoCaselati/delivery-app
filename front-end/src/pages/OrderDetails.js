import React, { useEffect, useState } from 'react';
import Header from '../components/Header';

export default function OrderDetails() {
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const name = localStorage.getItem('username');
    setUsername(name);

    const cart = JSON.parse(localStorage.getItem('cart'));
    setProducts(cart);

    const total = JSON.parse(localStorage.getItem('totalPrice'));
    setTotalPrice(total);
  }, []);

  return (
    <div>
      <Header name={username} />
      <h2>Detalhe do Pedido</h2>
      <div>
        <p
          data-testid={
            `customer_order_details__element-order-details-label-order-${id}`
          }
        >
          Pedido 0003;
        </p>
        <p
          data-testid={
            "customer_order_details__element-order-details-label-seller-name"
          }
        >
          P. Vend: nome
        </p>
        <div>07/04/2021</div>
        <div>entregue</div>
        <div>marcar como entregue</div>
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
            <th>Remover item</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product, index) => (
            <tr key={product.id}>
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
