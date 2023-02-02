const express = require('express');

const router = express.Router();

const saleController = require('../controllers/saleController');

router.post('/', saleController.createSale);
router.get('/user/:id', saleController.getByUserId);
router.get('/seller/:id', saleController.getSalesBySellerId);
router.get('/sale-products/:id', saleController.getSaleProducts);
router.get('/:id', saleController.getById);

module.exports = router;