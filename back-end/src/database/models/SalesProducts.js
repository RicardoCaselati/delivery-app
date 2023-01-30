module.exports = (sequelize, DataTypes) => {
  const SaleProductTable = sequelize.define(
    "SaleProduct",
    {
      saleId: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      productId: DataTypes.INTEGER,
      quantity: DataTypes.INTEGER,
    },
    {
      tableName: "sales_products",
      underscored: true,
      timestamps: false,
    }
  );

  SaleProductTable.associate = (({ Sale, Product }) => {
    Sale.belongsToMany(Product, {
      as: "products",
      foreignKey: "saleId",
      otherKey: "productId",
      through: SaleProductTable,
    });
    Product.belongsToMany(Sale, {
      as: "sales",
      foreignKey: "productId",
      otherKey: "saleId",
      through: SaleProductTable,
    });
  });

  return SaleProductTable;
};