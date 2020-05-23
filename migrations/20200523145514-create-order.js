'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'Users',
          },
          key: 'id'
        },
        allowNull: false
      },
      status_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'OrderStatuses',
          },
          key: 'id'
        },
        allowNull: false
      },
      requested_time: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      payment_type: {
        allowNull: false,
        type: Sequelize.STRING,
      },
      amount: {
        allowNull: false,
        type: Sequelize.DECIMAL(10,2),
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Orders');
  }
};