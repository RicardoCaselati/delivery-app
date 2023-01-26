require('dotenv/config');
const jwt = require('jsonwebtoken');
const path = require('path');

const secret = require('fs')
.readFileSync(path.resolve(__dirname, '../../jwt.evaluation.key'), { encoding: 'utf-8' });

const createToken = (data) => {
    const token = jwt.sign({ data }, secret, {
        expiresIn: '1d',
        algorithm: 'HS256',
    });

    return token;
};

const validateToken = (token) => {
    try {
        const validToken = jwt.verify(token, secret);

        return validToken;
    } catch (error) {
        return false;
    }
};

module.exports = {
    createToken, 
    validateToken,
};