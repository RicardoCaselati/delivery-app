const { SaleProduct } = require('../database/models');

const createSaleProduct = async (cart, saleId) => {
  console.log(cart);
    // try {
      const result = cart.map(async (product) => {
        await SaleProduct.create({
          saleId,
          productId: product.id,
          quantity: product.qty,
        });
      });
      // await Promise.all(result);
      console.log(result);
      // console.log(test);
    // } catch (error) {
    //   console.log(error);
    //   return { type: 500, message: 'Internal error' };
    // }
  };
  
  module.exports = {
    createSaleProduct,
  };
  // const result = await SaleProduct.bulkCreate({
  //   saleID,
  //   productID: product.id,
  //   quantity: product.qty,
  // });