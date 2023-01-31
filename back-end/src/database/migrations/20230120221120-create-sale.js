'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('sales', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'user_id',
        references: {
          model: 'users',
          key: 'id',
        }
      },
      sellerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'seller_id',
        references: {
          model: 'users',
          key: 'id',
        }
      },
      totalPrice: {
        type: Sequelize.DECIMAL(9, 2),
        field: 'total_price',
        allowNull: false
      },
      deliveryAddress: {
        type: Sequelize.STRING,
        field: 'delivery_address',
        allowNull: false
      },
      deliveryNumber: {
        type: Sequelize.STRING,
        field: 'delivery_number',
        allowNull: false
      },
      saleDate: {
        type: Sequelize.DATE,
        field: 'sale_date',
        allowNull: true
      },
      status: { type: Sequelize.STRING, allowNull: false },
    });
  },
  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('sales');
  }
};