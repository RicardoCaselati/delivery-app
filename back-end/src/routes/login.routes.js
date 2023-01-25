const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
const loginController = require('../controllers/loginController');

router.post('/', authController.login);
router.post('/new', loginController.newUser);

module.exports = router;