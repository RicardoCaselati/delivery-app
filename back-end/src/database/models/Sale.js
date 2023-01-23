module.exports = (sequelize, DataTypes) => {
  const Sale = sequelize.define('Sale', {
    user_id: DataTypes.INTEGER,
    seller_id: DataTypes.INTEGER,
    total_price: DataTypes.DECIMAL,
    delivery_address: DataTypes.STRING,
    delivery_number: DataTypes.STRING,
    sale_date: DataTypes.DATE,
    status: DataTypes.STRING,
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'sales'
  });

  Sale.associate = (models) => {
    models.Sale.hasMany(models.User, {
      as: 'user',
      foreignKey: 'userId',
    });
  };

  return Sale;
};



