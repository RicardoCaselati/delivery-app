const { User } = require('../database/models');

const getAll = async () => {
    try {
      const result = await User.findAll({
        where: { role: 'seller' },
        attributes: { exclude: ['password'] },
      });
      return { type: null, message: result };
    } catch (error) {
      return { type: 500, message: 'Internal error' };
    }
  };
  
  module.exports = {
      getAll,
  };