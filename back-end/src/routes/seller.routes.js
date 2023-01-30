const express = require('express');

const router = express.Router();

const sellerController = require('../controllers/sellerController');

router.get('/', sellerController.getAll);

module.exports = router;