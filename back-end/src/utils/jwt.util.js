require('dotenv/config');
const jwt = require('jsonwebtoken');

const secret = process.env.JWT_SECRET || 'secret_key';

const createToken = (data) => {
    const token = jwt.sign({ data }, secret, {
        expiresIn: '1d',
        algorithm: 'HS256',
    });

    return token;
};

const validateToken = (token) => {
    try {
        const { data } = jwt.verify(token, secret);

        return data;
    } catch (error) {
        return { type: 400 };
    }
};

module.exports = {
    createToken, validateToken,
};