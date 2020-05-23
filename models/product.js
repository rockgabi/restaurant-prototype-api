'use strict';
module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    image: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.DECIMAL(10,2)
  }, {});
  Product.associate = function(models) {
    models.Product.belongsToMany(models.User, { through: 'Favorites', foreignKey: 'product_id', otherKey: 'user_id', as: 'users' });
  };
  return Product;
};