import React from 'react';
import { string, number } from 'prop-types';
import '../style/components/product-card.css';

export default function ProductCard({ id, name, price, urlImage }) {
  return (
    <div className="products">
      <div className="card-product">
        <p
          className="product-price"
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          {`R$${price}`}
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
          >
            -
          </button>
          <input
            type="number"
            className="qtt-field"
            data-testid={ `customer_products__input-card-quantity-${id}` }
          />
          <button
            className="plus-button"
            data-testid={ `customer_products__button-card-add-item-${id}` }
            type="button"
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
}.isRequired;
