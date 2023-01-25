module.exports = (sequelize, DataTypes) => {
  const SaleTable = sequelize.define(
    'Sale',
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: DataTypes.INTEGER,
      sellerId: DataTypes.INTEGER,
      totalPrice: DataTypes.DECIMAL(9, 2),
      deliveryAddress: DataTypes.STRING,
      deliveryNumber: DataTypes.STRING,
      saleDate: DataTypes.DATE,
      status: DataTypes.STRING,
    },
    {
      tableName: 'sales',
      underscored: true,
      // timestamps: false,
    }
  );

  SaleTable.associate = ({ User }) => {
    SaleTable.belongsTo(User, {
      as: 'user',
      foreignKey: 'id',
    });
    SaleTable.belongsTo(User, {
      as: 'seller',
      foreignKey: 'id',
    });
  };

  return SaleTable;
};