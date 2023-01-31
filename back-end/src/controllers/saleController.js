const saleService = require('../services/sale.service');

const createSale = async (req, res) => {
  try {
    const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, cart,
    } = req.body;
    const { type, message } = await saleService.createSale({
      userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, cart });
    res.status(type).json(message);
  } catch (error) {
    console.log(error);
  }
};

module.exports = { createSale };