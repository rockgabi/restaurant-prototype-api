'use strict';
module.exports = (sequelize, DataTypes) => {
  const Favorite = sequelize.define('Favorite', {
    user_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
  }, {});
  Favorite.associate = function(models) {
    
  };
  return Favorite;
};