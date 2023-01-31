module.exports = (sequelize, DataTypes) => {
  const UserTable = sequelize.define(
    "User",
    {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, allowNull: false, unique: true },
    password: { type: DataTypes.STRING, allowNull: false },
    role: { type: DataTypes.STRING, allowNull: false },
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