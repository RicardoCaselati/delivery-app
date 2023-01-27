import React, { useEffect, useState } from 'react';
import { string, number, func } from 'prop-types';
import '../style/components/product-card.css';

export default function ProductCard(
  { id, name, price, urlImage, setTotalPrice, cartProducts, setCartProducts },
) {
  const [productQty, setProductQty] = useState(0);

  useEffect(() => {
    const aux = { id, name, qty: productQty, price, totalPrice: productQty * price };

    if (productQty >= 1) {
      const aux2 = cartProducts.filter((product) => product.name !== name);
      setCartProducts([...aux2, aux]);
    } else if (productQty !== 0) {
      setCartProducts([...cartProducts, aux]);
    }
  }, [productQty]);

  useEffect(() => console.log(cartProducts), [cartProducts]);

  const removeItemfromCart = () => {
    if (productQty > 0) {
      setTotalPrice((prev) => Number(prev) - Number(price));
      setProductQty((prev) => Number(prev) - 1);
    }
  };

  const addItemToCart = () => {
    setTotalPrice((prev) => prev + Number(price));
    setProductQty((prev) => prev + 1);
  };

  const handleInputItems = (qty) => {
    if (qty === 0) {
      const aux = productQty * price;
      setTotalPrice((prev) => prev - aux);
      setProductQty(0);
    } else {
      const aux = price * (qty - productQty);
      setTotalPrice((prev) => prev + aux);
      setProductQty(qty);
    }
  };

  return (
    <div className="products">
      <div className="card-product">
        <p
          className="product-price"
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          {`${JSON.stringify(price).replace('.', ',')}`}
        </p>
        <img
          className="product-img"
          data-testid={ `customer_products__img-card-bg-image-${id}` }
          src={ urlImage }
          alt="product"
        />
        <div className="card-tag">
          <p
            className="product-title"
            data-testid={ `customer_products__element-card-title-${id}` }
          >
            {name}
          </p>
          <button
            className="minus-button"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
            type="button"
            onClick={ removeItemfromCart }
          >
            -
          </button>
          <input
            type="number"
            min={ 0 }
            className="qtt-field"
            value={ productQty }
            onChange={ ({ target }) => handleInputItems(target.value) }
            data-testid={ `customer_products__input-card-quantity-${id}` }
          />
          <button
            className="plus-button"
            data-testid={ `customer_products__button-card-add-item-${id}` }
            type="button"
            onClick={ addItemToCart }
          >
            +
          </button>
          <div />
        </div>
      </div>
    </div>
  );
}

ProductCard.propTypes = {
  id: number,
  name: string,
  price: number,
  urlImage: number,
  totalPrice: number,
  setTotalPrice: func,
}.isRequired;
