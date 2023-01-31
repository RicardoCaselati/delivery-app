const saleService = require('../services/sale.service');

const createSale = async (req, res) => {
    const sale = {
      userId: req.body.userId,
      sellerId: req.body.sellerId,
      totalPrice: req.body.totalPrice,
      deliveryAddress: req.body.deliveryAddress,
      deliveryNumber: req.body.deliveryNumber,
      cart: req.body.cart,
      saleDate: new Date(),
    };

    const saleCreated = await saleService.createSale(sale);
    if (saleCreated.type === 500) {
        return res.status(500).json(saleCreated.message);
    }
    res.status(201).json({ message: saleCreated.message });
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.getById(id);
  res.status(type || 200).json({ message });
};

module.exports = { createSale, getById };