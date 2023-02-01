const express = require('express');

const router = express.Router();

const saleController = require('../controllers/saleController');

router.post('/', saleController.createSale);
router.get('/:id', saleController.getSalesBySellerId);
router.get('/sale-products/:id', saleController.getSaleProducts);

module.exports = router;