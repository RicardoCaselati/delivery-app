module.exports = (sequelize, DataTypes) => {
  const UserTable = sequelize.define(
    "User",
    {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: { type: DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING },
    },
    {
      timestamps: false,
      tableName: 'users',
      underscored: true,
    }
  );

  UserTable.associate = (models) => {
    UserTable.hasMany(models.Sale, {
      foreignKey: 'userId',
      as: 'user'
    });
    UserTable.hasMany(models.Sale, {
      foreignKey: 'sellerId',
      as: 'seller'
    });
  }

  return UserTable;
};