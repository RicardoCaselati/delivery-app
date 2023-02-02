const saleService = require('../services/sale.service');

const createSale = async (req, res) => {
  try {
    const { userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, cart,
    } = req.body;
    const { type, message } = await saleService.createSale({
      userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, cart,
    });
    res.status(type).json(message);
  } catch (error) {
    console.log(error);
  }
};

const getByUserId = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.getByUserId(id);
  res.status(type || 200).json({ message });
};

const getSalesBySellerId = async (req, res) => {
  const { id } = req.params;

  const sales = await saleService.getSalesBySellerId(id);

  res.status(200).json(sales);
};

const getSaleProducts = async (req, res) => {
  const { id } = req.params;

  const saleProducts = await saleService.getSalesProducts(id);

  res.status(200).json(saleProducts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await saleService.getById(id);
  // if (type) res.status(type).json(message);
  res.status(type || 200).json({ message });
};

module.exports = {
  createSale,
  getSalesBySellerId,
  getSaleProducts,
  getByUserId,
  getById,
};
