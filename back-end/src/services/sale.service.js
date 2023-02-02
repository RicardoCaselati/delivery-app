const { Sale, SaleProduct, Product, User } = require('../database/models');
const { saleStatus } = require('../utils/saleStatus.util');

const getByUserId = async (id) => {
  try {
    const result = await Sale.findAll({ where: { userId: id } });
    return { type: null, message: result };
  } catch (error) {
    return { type: 500, message: 'Internal error' };
  }
};
  
const createSaleProduct = async (saleId, productId, quantity) => {
  const response = await SaleProduct.create({
    saleId,
    productId,
    quantity,
  });
  if (!response) throw new Error(400, 'Error');

  return { type: 201, message: response };
};

const createSale = async ({
  userId, sellerId, totalPrice, deliveryAddress, deliveryNumber, cart }) => {
  const response = await Sale.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status: saleStatus.PENDENTE,
  });
  if (!response) throw new Error(404, 'Error');

  const salesProductPromises = cart.map(async (product) => {
    await createSaleProduct(response.id, product.id, product.qty);
  });
  await Promise.all(salesProductPromises);
  return { type: 201, message: response };
};

const getSalesBySellerId = async (id) => {
  const sales = await Sale.findAll({ where: { sellerId: id } });

  return sales;
};

const getSalesProducts = async (saleId) => {
  const products = await SaleProduct.findAll({ where: { saleId } });

  const saleProducts = products.reduce(async (acc, curr) => {
    const product = await Product.findOne({ where: { id: curr.productId } });
    return [
      ...acc,
      {
        name: product.name,
        price: product.price,
        qty: curr.quantity,
        totalPrice: this.price * this.qty,
      },
    ];
  }, []);

  // await Promise.all(saleProducts);

  return saleProducts;
};

const getById = async (id) => {
  try {
    const result = await Sale.findAll({
      where: { id },
      include: [
        { model: Product, as: 'products', through: { attributes: ['quantity'] } },
        { model: User, as: 'seller', attributes: ['name'] },
      ],
    });
    return { type: null, message: result };
  } catch (error) {
    return { type: 500, message: 'Internal error' };
  }
};

module.exports = {
  createSale,
  getSalesBySellerId,
  getSalesProducts,
  getByUserId,
  getById,
};