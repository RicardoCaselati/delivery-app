const { Product } = require('../database/models');

const getAll = async () => {
    try {
      const result = await Product.findAll();
      return { type: null, message: result };
    } catch (error) {
      return { type: 500, message: 'Internal error' };
    }
  };
  
  module.exports = {
      getAll,
  };