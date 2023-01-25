module.exports = (sequelize, DataTypes) => {
  const ProductTable = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    price: DataTypes.DECIMAL(4, 2),
    urlImage: DataTypes.STRING,
  }, {
    tableName: 'products',
    // underscored: true,
    timestamps: false,
  });

  return ProductTable;
};