import React from 'react';
import PropTypes from 'prop-types';

export default function SaleCart({ cart }) {
  const prefix = 'customer_order_details__element-order-table';

  return (
    <table className="details-table-body">
      <thead className="details-table-items">
        <tr>
          <th>Item</th>
          <th>Descrição</th>
          <th>Quantidade</th>
          <th>Valor Unitário</th>
          <th>Sub-total</th>
        </tr>
      </thead>
      <tbody>
        {cart && cart.map(
          ({ id, name, price, SaleProduct: { quantity } }) => (
            <tr key={ id } className="details-table-line">
              <td data-testid={ `${prefix}-item-number-${id}` }>
                { id }
              </td>

              <td data-testid={ `${prefix}-name-${id}` }>
                { name }
              </td>

              <td data-testid={ `${prefix}-quantity-${id}` }>
                { quantity }
              </td>

              <td data-testid={ `${prefix}-unit-price-${id}` }>
                { price }
              </td>

              <td data-testid={ `${prefix}-sub-total-${id}` }>
                { quantity * price }
              </td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
}

SaleCart.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape).isRequired,
};
