module.exports = (sequelize, DataTypes) => {
  const SaleTable = sequelize.define( 'Sale', {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
      userId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
      sellerId: { type: DataTypes.INTEGER, allowNull: false, foreignKey: true },
      totalPrice: { type: DataTypes.DECIMAL(9, 2), allowNull: false },
      deliveryAddress: { type: DataTypes.STRING, allowNull: false },
      deliveryNumber: { type: DataTypes.STRING, allowNull: false },
      saleDate: { type: DataTypes.DATE, allowNull: true, defaultValue: DataTypes.NOW },
      status: { type: DataTypes.STRING, allowNull: false }
    },
    {
      tableName: 'sales',
      underscored: true,
      timestamps: false,
    }
  );

  SaleTable.associate = (models) => {
    SaleTable.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'user',
    });
    SaleTable.belongsTo(models.User, {
      foreignKey: 'sellerId',
      as: 'seller',
    });
  }

  return SaleTable;
};