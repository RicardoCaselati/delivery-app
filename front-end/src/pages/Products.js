import React, { useEffect, useState } from 'react';
import Products from '../components/Products';
import Checkout from '../components/Checkout';
import Header from '../components/Header';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(
      'http://localhost:3001/products',
    ).then((res) => res.json()).then((json) => setProducts(json.message));
    // ).then((res) => res.json()).then((json) => console.log(json.message));
  }, []);
  return (
    <div>
      <Header />
      {products.map(
        ({ id, name, price, urlImage }) => (
          <div key={ id }>
            <Products
              id={ id }
              name={ name }
              price={ price }
              urlImage={ urlImage }
            />
          </div>
        ),
      )}
      <Checkout />
    </div>
  );
}
