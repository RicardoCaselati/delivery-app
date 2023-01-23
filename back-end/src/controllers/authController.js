const authService = require('../services/auth.service');

const login = async (req, res) => {
    const { email, password } = authService.validateBody(req.body);

    const token = await authService.validateLogin({ email, password });

    if (token.type === 404) return res.status(404).json({ message: 'Invalid email or password' });

    res.status(200).json({ token });
};

module.exports = { login };