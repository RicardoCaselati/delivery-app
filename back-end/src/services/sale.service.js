const { Sale } = require('../database/models');
const { saleStatus } = require('../utils/saleStatus.util');
const { createSaleProduct } = require('./saleProduct.service');

const createSale = async (sale) => {
  try {
    const result = await Sale.create({
      ...sale,
      status: saleStatus.PENDENTE,
    }, { raw: true });
    await createSaleProduct(sale.cart, result.id);
    return { type: null, message: result };
  } catch (error) {
    return { type: 500, message: 'Internal error' };
  }
};

const getById = async (id) => {
  try {
    const result = await Sale.findAll({ where: { userId: id } });
    return { type: null, message: result };
  } catch (error) {
    return { type: 500, message: 'Internal error' };
  }
};
  
module.exports = {
  createSale,
  getById,
};