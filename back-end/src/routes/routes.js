const express = require('express');

const { loginRouter, productRouter, adminRouter } = require('.');

const routers = express.Router();

routers.use('/login', loginRouter);
routers.use('/products', productRouter);
routers.use('/admin', adminRouter);

module.exports = routers;