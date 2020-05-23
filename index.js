const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const usersController = require('./controllers').users;
const productsController = require('./controllers').products;
const favoritesController = require('./controllers').favorites;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.listen(3000, () => {
    console.log("El servidor está inicializado en el puerto 3000");
});

app.get('/', function (req, res) {
    res.send('Main page');
});

app.post('/login', function (req, res) {

});

app.post('/register', function (req, res) {

});

app.get('/users', usersController.fetch);
app.post('/users', usersController.create);
app.put('/users/:id', usersController.update);
app.delete('/users/:id', usersController.delete);

app.get('/products', productsController.fetch);
app.post('/products', productsController.create);
app.put('/products/:id', productsController.update);
app.delete('/products/:id', productsController.delete);

app.get('/users/:user_id/favorites', favoritesController.fetch);
app.post('/users/:user_id/favorites', favoritesController.create);
app.delete('/users/:user_id/favorites', favoritesController.delete);

