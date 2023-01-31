const { User } = require('../database/models');

const listUsers = async () => User.findAll();

const addUser = async (name, email, hashPassword, role) =>
  User.create({ name, email, password: hashPassword, role });

module.exports = {
  listUsers,
  addUser,
};
