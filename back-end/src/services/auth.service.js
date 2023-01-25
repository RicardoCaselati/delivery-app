const Joi = require('joi');
const md5 = require('md5');

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

    return { role: user.role, email: user.email };
};

module.exports = { validateBody, validateLogin };