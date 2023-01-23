const express = require('express');

const { loginRouter } = require('./')

const routers = express.Router();

routers.use('/login', loginRouter);

module.exports = routers;