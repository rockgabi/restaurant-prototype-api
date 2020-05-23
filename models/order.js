'use strict';
module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    time: DataTypes.STRING,
    user_id: DataTypes.INTEGER,
    status_id: DataTypes.INTEGER,
    requested_time: DataTypes.DATE,
    description: DataTypes.STRING,
    payment_type: DataTypes.STRING,
    amount: DataTypes.DECIMAL(10,2)
  }, {});
  Order.associate = function(models) {
    models.Order.belongsTo(models.User, { foreignKey: 'user_id' });
    models.Order.belongsTo(models.OrderStatus, { foreignKey: 'status_id' });
    models.Order.hasMany(models.OrderItem, { foreignKey: 'order_id' });
  };
  return Order;
};