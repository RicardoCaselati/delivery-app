const md5 = require('md5');
const userService = require('../services/users.service');
const { validateToken } = require('../utils/jwt.util');

const listUsers = async (_req, res) => {
  const users = await userService.listUsers();

  res.status(200).json(users);
};

const addUser = async (req, res) => {
  const { name, email, password, role } = req.body;
  const authorizariton = req.header('authorization');

  const { data } = validateToken(authorizariton);
  if (!data) return res.status(409).json({ message: 'Invalid token' });
  if (data.role !== 'administrator') {
    return res.status(409).json({ message: 'User not authorized' });
  }

  const users = await userService.listUsers();

  if (users.some((user) => user.name === name || user.email === email)) {
    return res.status(409).json({ message: 'User already exists' });
  }

  const hashPassword = md5(password);

  await userService.addUser(name, email, hashPassword, role);

  res.status(201).json({ message: 'User created successfully' });
};

module.exports = {
  listUsers,
  addUser,
};
