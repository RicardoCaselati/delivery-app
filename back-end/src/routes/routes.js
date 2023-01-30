const express = require('express');

const { loginRouter, productRouter, userRouter } = require('.');

const routers = express.Router();

routers.use('/login', loginRouter);
routers.use('/products', productRouter);
routers.use('/users', userRouter);

module.exports = routers;