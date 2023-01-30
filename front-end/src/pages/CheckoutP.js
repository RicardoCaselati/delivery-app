import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header';

export default function CheckoutP() {
  const [username, setUsername] = useState('');
  const [products, setProducts] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  // const [sellerId,setSellerId] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [DeliveryNumber, setDeliveryNumber] = useState('');
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
    // if (user) {
    //   fetch(`http://localhost:3001/login/validate/${user.token}`).then((res) => {
    //     if (res.status === STATUS_ERROR_CODE) navigate('/login');
    //     else {
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
          DeliveryNumber,
        }),
      },
    ).then((res2) => res2.json()).then((json) => {
      if (json) {
        localStorage.setItem('orderId', json.message.id);
        localStorage.setItem('status', json.message.status);
        localStorage.setItem('saleDate', json.message.saleDate);
        console.log(sellerName);
        localStorage.setItem('sellerName', sellerName);
        console.log(json);
        navigate(`/customer/orders/${json.message.id}`);
      }
    });
    //       }
    //     }, []);
    //   }
  };

  return (
    <div>
      <Header name={ username } />
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
            <tr key={ product.id }>
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
        data-testid="customer_checkout__element-order-total-price"
      >
        {`${totalPrice.toFixed(2).replace('.', ',')}`}
      </div>
      <div>
        <h1>Detalhes da entrega</h1>
        <select
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
        <input
          data-testid="customer_checkout__input-address"
          onChange={ ({ target }) => setDeliveryAddress(target.value) }
        />
        <input
          data-testid="customer_checkout__input-address-number"
          onChange={ ({ target }) => setDeliveryNumber(target.value) }
        />
        <button
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
