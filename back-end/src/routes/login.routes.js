const express = require('express');

const router = express.Router();

const authController = require('../controllers/authController');
const loginController = require('../controllers/loginController');
const jwtUtil = require('../utils/jwt.util');

router.post('/', authController.login);
router.post('/new', loginController.newUser);
router.get('/validate/:token', (req, res) => { 
    const { token } = req.params;
    const validToken = jwtUtil.validateToken(token);

    if (validToken) {
        return res.status(200).end();
    }
    return res.status(403).end();
});

module.exports = router;