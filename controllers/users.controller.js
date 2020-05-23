const bcrypt = require('bcrypt');
const User = require('../models').User;

module.exports = {
    fetch(req, res) {
        return User.findAll()
            .then(users => {
                res.status(200).send(users);
            })
            .catch(error => {
                res.status(400).send(error);
            });
    },
    create(req, res) {
        const password = req.body.password && req.body.password != "" ? bcrypt.hashSync(req.body.password, 10) : "";

        return User.create({
            name: req.body.name,
            email: req.body.email,
            password: password,
        })
            .then(user => {
                res.status(201).send(user);
            })
            .catch(error => {
                res.status(400).send(error);
            });
    },
    update(req, res) {
        const id = req.body.id;
        const password = req.body.password && req.body.password != "" ? bcrypt.hashSync(req.body.password, 10) : "";
        const data = Object.assign({}, req.body, { password });
        delete data.id;

        return User.update(
            data,
            { where: { id } }
        )
            .then(rowsAffected => User.findOne({ id }).then(user => res.status(201).send(user)))
            .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        const id = req.body.id;

        return User.delete(id)
            .then(() => res.status(200).send({ id }))
            .catch( error => res.status(400).send(error));
    }
}