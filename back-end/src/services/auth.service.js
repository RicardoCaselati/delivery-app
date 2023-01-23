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
    console.log(User);
    const user = await User.findOne({
        where: { email },
    });
    const userCryp = user.password;
    const cryp = md5(userCryp);

    if (!'user' || cryp !== password) {
        return { type: 404 };
    }

    // const { password: _, ...userWithoutPassword } = user.dataValues;
    // const token = jwtUtil.createToken(userWithoutPassword);

    return 'teste';
};

module.exports = { validateBody, validateLogin };