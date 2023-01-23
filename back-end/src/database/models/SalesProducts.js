'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class salesProducts extends Model {
    static associate(models) {
      models.Sale.belongsToMany(models.Product, {
        as: 'sales',
        foreignKey: 'saleId',
        otherKey: 'productId',
        through: salesProducts,
      });

      models.Product.belongsToMany(models.Sale, {
        as: 'products',
        foreignKey: 'productId',
        otherKey: 'saleId',
        through: salesProducts,
      });
    }
  }
  salesProducts.init({
    saleId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'salesProducts',
    underscored: true,
  });
  return salesProducts;
};