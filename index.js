const express = require("express");
const app = express();
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/config/config.json')[env];

const authController = require('./controllers').auth;
const usersController = require('./controllers').users;
const productsController = require('./controllers').products;
const favoritesController = require('./controllers').favorites;
const statusesController = require('./controllers').statuses;
const ordersController = require('./controllers').orders;

const User = require('./models').User;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});

// Authentication middleware
function authenticateToken(req, res, next) {
    // Gather the jwt access token from the request header
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401) // if there isn't any token

    jwt.verify(token, config.token_secret, (err, user) => {
        if (!user) return res.sendStatus(403);
        req.user = user;
        next(); // pass the execution off to whatever request the client intended
    });
}

async function restrictAdmin(req, res, next) {
    const user = await User.findByPk(req.user.id);
    if (!user || !user.admin) return res.sendStatus(403);
    req.user = user;
    next(); // pass the execution off to whatever request the client intended
}

app.get('/', function (req, res) {
    res.send('Main page');
});

app.post('/login', authController.login);

app.post('/register', authController.register);

app.get('/users', authenticateToken, restrictAdmin, usersController.fetch);
app.post('/users', authenticateToken, restrictAdmin, usersController.create);
app.put('/users/:id', authenticateToken, restrictAdmin, usersController.update);
app.delete('/users/:id', authenticateToken, restrictAdmin, usersController.delete);

app.get('/products', authenticateToken, productsController.fetch);
app.post('/products', authenticateToken, productsController.create);
app.put('/products/:id', authenticateToken, productsController.update);
app.delete('/products/:id', authenticateToken, productsController.delete);

app.get('/statuses', authenticateToken, statusesController.fetch);
app.post('/statuses', authenticateToken, statusesController.create);
app.put('/statuses/:id', authenticateToken, statusesController.update);
app.delete('/statuses/:id', authenticateToken, statusesController.delete);

app.get('/orders', authenticateToken, ordersController.fetch);
app.post('/orders', authenticateToken, ordersController.create);
app.put('/orders/:id', authenticateToken, ordersController.update);
app.delete('/orders/:id', authenticateToken, ordersController.delete);

app.get('/users/:user_id/favorites', authenticateToken, favoritesController.fetch);
app.post('/users/:user_id/favorites', authenticateToken, favoritesController.create);
app.delete('/users/:user_id/favorites', authenticateToken, favoritesController.delete);

