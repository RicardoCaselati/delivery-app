const Joi = require('joi');
const md5 = require('md5');
const jwtUtil = require('../utils/jwt.util');

const { User } = require('../database/models');

const validateBody = (params) => {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });
    
    const { error, value } = schema.validate(params);
    if (error) throw error;

    return value;
};

const validateLogin = async ({ email, password }) => {
    const user = await User.findOne({
        where: { email },
    });

    const newPassword = md5(password);
    if (!user || user.password !== newPassword) {
        return { type: 404 };
    }

    const userNotPassword = user.dataValues;
    const { password: _, ...userWithoutPassword } = userNotPassword;
    const token = jwtUtil.createToken(userWithoutPassword);

    return { name: user.name, email: user.email, role: user.role, token };
};

module.exports = { validateBody, validateLogin };