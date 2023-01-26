const express = require('express');

const { loginRouter, productRouter, saleRouter } = require('.');

const routers = express.Router();

routers.use('/login', loginRouter);
routers.use('/products', productRouter);
routers.use('/sales', saleRouter);

module.exports = routers;