import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

export default function SellerOrderDetails() {
  const [products, setProducts] = useState([]);
  const [orderDate, setOrderDate] = useState('');
  const [orderStatus, setOrderStatus] = useState('');
  const [orderPrice, setOrderPrice] = useState(0);

  const { saleId } = useParams();

  useEffect(() => {
    fetch(`http://localhost:3001/sales/sale-products/${saleId}`).then((response) => response.json()).then((json) => setProducts(json));

    const aux = JSON.parse(localStorage.getItem('orderDate'));
    setOrderDate(aux);

    const aux2 = localStorage.getItem('orderStatus');
    setOrderStatus(aux2);

    const aux3 = JSON.parse(localStorage.getItem('orderPrice'));
    setOrderPrice(aux3);
  }, []);

  return (
    <div>
      <header>
        <div data-testid="customer_products__element-navbar-link-orders" />
        <div data-testid="customer_products__element-navbar-user-full-name" />
        <div data-testid="customer_products__element-navbar-link-logout" />
      </header>
      <div
        data-testid="seller_order_details__element-order-details-label-order-id"
      >
        {saleId}
      </div>
      <div
        data-testid="seller_order_details__element-order-details-label-order-date"
      >
        {new Date(orderDate).toLocaleDateString()}
      </div>
      <div
        data-testid="seller_order_details__element-order-details-label-delivery-status"
      >
        {orderStatus}
      </div>
      <button
        type="button"
        data-testid="seller_order_details__button-preparing-check"
      >
        PREPARAR PEDIDO
      </button>
      <button
        disabled
        type="button"
        data-testid="seller_order_details__button-dispatch-check"
      >
        SAIU PARA ENTREGA
      </button>
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
                  `seller_order_details__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-name-${index}`
                }
              >
                {product.name}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-quantity-${index}`
                }
              >
                {product.qty}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-unit-price-${index}`
                }
              >
                {`${Number(product.price).toFixed(2).replace('.', ',')}`}
              </td>
              <td
                data-testid={
                  `seller_order_details__element-order-table-sub-total-${index}`
                }
              >
                {`${Number(product.totalPrice).toFixed(2).replace('.', ',')}`}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        data-testid="seller_order_details__element-order-total-price"
      >
        {Number(orderPrice).toFixed(2).replace('.', ',')}
      </div>
    </div>
  );
}
