const users = require('./users.controller');
const products = require('./products.controller');
const favorites = require('./favorites.controller');
const statuses = require('./statuses.controller');
const orders = require('./orders.controller');
const auth = require('./auth.controller');

module.exports = {
    users,
    products,
    favorites,
    statuses,
    orders,
    auth
}
