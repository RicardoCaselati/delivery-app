module.exports = (sequelize, DataTypes) => {
  const ProductTable = sequelize.define("Product", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: { type: DataTypes.STRING, allowNull: false, unique: true },
    price: {type: DataTypes.DECIMAL(4, 2), allowNull: false},
    urlImage: { type: DataTypes.STRING, allowNull: false, }
  }, {
    tableName: 'products',
    underscored: true,
    timestamps: false,
  });

  return ProductTable;
};