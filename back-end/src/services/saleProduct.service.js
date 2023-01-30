const { SaleProduct } = require('../database/models');

const createSaleProduct = async (cart, saleId) => {
    try {
      const result = cart.map(({ id, qty }) => (
        { saleId, productId: id, quantity: qty }
      ));
      await SaleProduct.bulkCreate(result);
    } catch (error) {
      return { type: 500, message: 'Internal error' };
    }
  };
  
  module.exports = {
    createSaleProduct,
  };
  // const result = await SaleProduct.bulkCreate({
  //   saleID,
  //   productID: product.id,
  //   quantity: product.qty,
  // });