const express = require('express');

const { loginRouter, productRouter } = require('.');

const routers = express.Router();

routers.use('/login', loginRouter);
routers.use('/products', productRouter);

module.exports = routers;