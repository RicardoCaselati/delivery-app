const sellerService = require('../services/seller.service');

const getAll = async (req, res) => {
    const { type, message } = await sellerService.getAll();
    // if (type) res.status(type).json(message);
    res.status(type || 200).json({ message });
};

module.exports = { getAll };