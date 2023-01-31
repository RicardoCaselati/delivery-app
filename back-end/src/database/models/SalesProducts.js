module.exports = (sequelize, DataTypes) => {
  const SaleProductTable = sequelize.define(
    "SaleProduct",
    {
      saleId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
      productId: { type: DataTypes.INTEGER, foreignKey: true, allowNull: false },
      quantity: { type: DataTypes.INTEGER, allowNull: false },
    },
    {
      tableName: "sales_products",
      underscored: true,
      timestamps: false,
    }
  );

  SaleProductTable.associate = (models) => {
    models.Product.belongsToMany(models.Sale, {
      as: 'sales',
      through: SaleProductTable,
      foreignKey: 'saleId',
      otherKey: 'productId',
    });
    
    models.Sale.belongsToMany(models.Product, {
      as: 'products',
      through: SaleProductTable,
      foreignKey: 'productId',
      otherKey: 'saleId',
    });
  }

  return SaleProductTable;
};