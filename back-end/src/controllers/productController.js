const productService = require('../services/product.service');

const getAll = async (req, res) => {
    const { type, message } = await productService.getAll();
    // if (type) res.status(type).json(message);
    res.status(type || 200).json({ message });
};

module.exports = { getAll };