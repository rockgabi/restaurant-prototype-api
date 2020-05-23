const bcrypt = require('bcrypt');
const Product = require('../models').Product;

module.exports = {
    fetch(req, res) {
        return Product.findAll()
            .then(products => {
                res.status(200).send(products);
            })
            .catch(error => {
                res.status(400).send(error);
            });
    },
    create(req, res) {
        const password = req.body.password && req.body.password != "" ? bcrypt.hashSync(req.body.password, 10) : "";
        const data = Object.assign({}, req.body);
        data.password = password;

        return Product.create(data)
            .then(product => {
                res.status(201).send(product);
            })
            .catch(error => {
                res.status(400).send(error);
            });
    },
    update(req, res) {
        const id = req.params.id;
        const password = req.body.password && req.body.password != "" ? bcrypt.hashSync(req.body.password, 10) : "";
        const data = Object.assign({}, req.body, { password });
        delete data.id;

        return Product.update(
            data,
            { where: { id } }
        )
            .then(rowsAffected => Product.findOne({ id }).then(product => res.status(201).send(product)))
            .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        const id = req.params.id;

        return Product.delete(id)
            .then(() => res.status(200).send({ id }))
            .catch( error => res.status(400).send(error));
    }
}