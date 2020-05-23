const express = require("express");
const app = express();
const bodyParser = require('body-parser');

const usersController = require('./controllers').users;

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
app.put('/users', usersController.update);
app.delete('/users', usersController.delete);

