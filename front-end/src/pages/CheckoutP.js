import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';
import '../style/pages/checkout.css';

export default function CheckoutP() {
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryNumber, setDeliveryNumber] = useState('');
  const [sellers, setSellers] = useState([]);
  const [sellerName, setSellerName] = useState('');

  useEffect(() => {
    const name = localStorage.getItem('username');
    setUsername(name);

    const cart = JSON.parse(localStorage.getItem('cart'));
    setProducts(cart);

    const total = JSON.parse(localStorage.getItem('totalPrice'));
    setTotalPrice(total);

    fetch(
      'http://localhost:3001/sellers',
    ).then((res2) => res2.json()).then((json) => {
      setSellers(json.message);
      setSellerName(json.message[0].name);
    });
  }, []);

  const removeItem = (name) => {
    const aux = products.find((product) => product.name === name);
    const aux2 = products.filter((product) => product.name !== name);

    setProducts(aux2);
    localStorage.setItem('cart', JSON.stringify(aux2));

    const aux3 = totalPrice - (aux.qty * aux.price);
    setTotalPrice(aux3);
    localStorage.setItem('totalPrice', JSON.stringify(aux3));
  };

  const navigate = useNavigate();

  const handleCheckout = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const cart = JSON.parse(localStorage.getItem('cart'));
    const { token } = JSON.parse(localStorage.getItem('user'));
    const userId = user.id;
    const sellerId = 2;
    fetch(
      'http://localhost:3001/sales',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', authorization: token },
        body: JSON.stringify({
          userId,
          sellerId,
          totalPrice,
          cart,
          deliveryAddress,
          deliveryNumber,
        }),
      },
    ).then((res2) => res2.json()).then((json) => {
      if (json) {
        localStorage.setItem('orderId', json.id);
        localStorage.setItem('status', json.status);
        localStorage.setItem('saleDate', json.saleDate);
        console.log(sellerName);
        localStorage.setItem('sellerName', sellerName);
        navigate(`/customer/orders/${json.id}`);
      }
    });
  };

  return (
    <div className="page-content">
      <Header name={ username } />
      <h1 className="title">Finalizar pedido</h1>
      <table className="table-body">
        <thead className="table-items">
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
            <tr key={ product.id } className="table-line">
              <td
                data-testid={
                  `customer_checkout__element-order-table-item-number-${index}`
                }
              >
                {index + 1}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-name-${index}`
                }
              >
                {product.name}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-quantity-${index}`
                }
              >
                {product.qty}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-unit-price-${index}`
                }
              >
                {`${Number(product.price).toFixed(2).replace('.', ',')}`}
              </td>
              <td
                data-testid={
                  `customer_checkout__element-order-table-sub-total-${index}`
                }
              >
                {`${Number(product.totalPrice).toFixed(2).replace('.', ',')}`}
              </td>
              <td>
                <button
                  className="remove-btn"
                  data-testid={
                    `customer_checkout__element-order-table-remove-${index}`
                  }
                  type="button"
                  onClick={ () => removeItem(product.name) }
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        className="total-value"
        data-testid="customer_checkout__element-order-total-price"
      >
        {`Valor total: R$${totalPrice.toFixed(2).replace('.', ',')}`}
      </div>
      <div className="details-body">
        <h1>Detalhes da entrega</h1>
        <div className="order-inputs">
          <div className="order-info">
            <p>Vendedor(a):</p>
            <select
              className="seller-input info"
              aria-label="seller"
              data-testid="customer_checkout__select-seller"
              onChange={ ({ target }) => setSellerName(target.value) }
            >
              {sellers.map((eachSeller, index) => (
                <option
                  key={ index }
                  value={ eachSeller.name }
                >
                  {eachSeller.name}
                </option>))}
            </select>
          </div>
          <div className="order-info">
            <p>Endereço:</p>
            <input
              className="info"
              data-testid="customer_checkout__input-address"
              onChange={ ({ target }) => setDeliveryAddress(target.value) }
            />
          </div>
          <div className="order-info">
            <p>Número:</p>
            <input
              className="info"
              data-testid="customer_checkout__input-address-number"
              onChange={ ({ target }) => setDeliveryNumber(target.value) }
            />
          </div>
        </div>
        <button
          className="checkout-btn"
          type="button"
          data-testid="customer_checkout__button-submit-order"
          onClick={ () => handleCheckout() }
        >
          Finalizar pedido
        </button>
      </div>
    </div>
  );
}
