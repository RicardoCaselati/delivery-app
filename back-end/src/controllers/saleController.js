const saleService = require('../services/sale.service');

const userId = 'user_id';
const sellerId = 'seller_id';
const totalPrice = 'total_price';
const deliveryAddress = 'delivery_address';
const deliveryNumber = 'delivery_number';
const saleDate = 'sale_date';

const createSale = async (req, res) => {
    const sale = {
      [userId]: req.body.userId,
      [sellerId]: req.body.sellerId,
      [totalPrice]: req.body.totalPrice,
      [deliveryAddress]: req.body.deliveryAddress,
      [deliveryNumber]: req.body.deliveryNumber,
      cart: req.body.cart,
      [saleDate]: new Date(),
    };

    const saleCreated = await saleService.createSale(sale);
    if (saleCreated.type === 500) {
        return res.status(500).json(saleCreated.message);
    }
    res.status(201).json(saleCreated.message);
};

module.exports = { createSale };