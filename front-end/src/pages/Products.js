import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Products from '../components/Products';
import Checkout from '../components/Checkout';
import Header from '../components/Header';

export default function ProductsPage() {
  const [products, setProducts] = useState();
  const [userName, setUserName] = useState('');
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartProducts, setCartProducts] = useState([]);

  const STATUS_ERROR_CODE = 403;

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user) {
      fetch(`http://localhost:3001/login/validate/${user.token}`).then((res) => {
        if (res.status === STATUS_ERROR_CODE) navigate('/login');
        else {
          setUserName(user.name);
          localStorage.setItem('username', user.name);

          fetch(
            'http://localhost:3001/products',
          ).then((res2) => res2.json()).then((json) => setProducts(json.message));
        }
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartProducts));
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
  }, [cartProducts]);

  return (
    <div>
      <Header name={ userName } />
      {products && products.map(
        ({ id, name, price, urlImage }) => (
          <div key={ id }>
            <Products
              id={ id }
              name={ name }
              price={ price }
              urlImage={ urlImage }
              totalPrice={ totalPrice }
              setTotalPrice={ setTotalPrice }
              cartProducts={ cartProducts }
              setCartProducts={ setCartProducts }
            />
          </div>
        ),
      )}
      <Checkout totalPrice={ totalPrice } />
    </div>
  );
}
