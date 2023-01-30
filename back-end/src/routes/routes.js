const express = require('express');

const { loginRouter, productRouter, saleRouter, sellerRouter } = require('.');

const routers = express.Router();

routers.use('/login', loginRouter);
routers.use('/products', productRouter);
routers.use('/sales', saleRouter);
routers.use('/sellers', sellerRouter);

module.exports = routers;