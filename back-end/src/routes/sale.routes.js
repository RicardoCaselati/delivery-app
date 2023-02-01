const express = require('express');

const router = express.Router();

const saleController = require('../controllers/saleController');

router.post('/', saleController.createSale);
router.get('/user/:id', saleController.getById);

module.exports = router;