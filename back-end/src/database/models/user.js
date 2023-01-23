module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true }, name: { type:DataTypes.STRING },
    email: { type: DataTypes.STRING },
    password: { type: DataTypes.STRING },
    role: { type: DataTypes.STRING },
  }, {
    underscored: true,
    timestamps: false,
    tableName: 'users'
  });

  User.associate = (models) => {
    models.User.hasMany(models.Sale, {
      as: 'sales',
      foreignKey: 'userId',
    });
  };

  return User;
};
