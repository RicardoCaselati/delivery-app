// const loginService = require('../services/login.service');

const login = async (req, res) => {
    // const { email, password } = req.body;
    // const result = await loginService.login({ email, password });
    return res.status(400).json({ message: 'Respost' })
    // if (result.type === 400) return res.status(400).json({ message: 'Invalid fields' });
    // res.status(200).json({ result });
};

module.exports = { login };