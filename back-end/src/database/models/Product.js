'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    static associate(models) {
    }
  }
  Product.init({
    name: DataTypes.STRING,
    price: DataTypes.INTEGER,
    urlImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Product',
    underscored: true,
  });
  return Product;
};