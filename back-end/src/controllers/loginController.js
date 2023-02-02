const loginService = require('../services/login.service');

const newUser = async (req, res) => {
    const { name, email, password } = req.body;
    const checkIfExists = await loginService.checkIfExists({ name, email });
    if (checkIfExists.type === 404) {
        return res.status(409).json({ message: 'Email or password already exist' });
    }
    if (checkIfExists.type === 200) {
        const { type, message } = await loginService.newUser({ name, email, password });
        return res.status(type).json({ message });
    }
};

module.exports = { newUser };