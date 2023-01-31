const express = require('express');

const { loginRouter, productRouter, saleRouter, sellerRouter, adminRouter } = require('.');

const routers = express.Router();

routers.use('/login', loginRouter);
routers.use('/products', productRouter);
routers.use('/sales', saleRouter);
routers.use('/sellers', sellerRouter);
routers.use('/admin', adminRouter);

module.exports = routers;