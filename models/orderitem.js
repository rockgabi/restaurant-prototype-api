'use strict';
module.exports = (sequelize, DataTypes) => {
  const OrderItem = sequelize.define('OrderItem', {
    order_id: DataTypes.NUMBER,
    product_id: DataTypes.NUMBER,
    quantity: DataTypes.NUMBER
  }, {});
  OrderItem.associate = function(models) {
    // associations can be defined here
    models.OrderItem.belongsTo(models.Order, { foreignKey: 'order_id' });
  };
  return OrderItem;
};