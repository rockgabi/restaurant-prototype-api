const Item = require('../models').OrderItem;

module.exports = {
    fetch(req, res) {
        return Item.findAll()
            .then(items => {
                res.status(200).send(items);
            })
            .catch(error => {
                res.status(400).send(error);
            });
    },
    create(req, res) {
        const data = Object.assign({}, req.body);

        return Item.create(data)
            .then(item => {
                res.status(201).send(item);
            })
            .catch(error => {
                res.status(400).send(error);
            });
    },
    update(req, res) {
        const id = req.params.id;
        const data = Object.assign({}, req.body);

        return Item.update(
            data,
            { where: { id } }
        )
            .then(rowsAffected => Item.findOne({ id }).then(item => res.status(201).send(item)))
            .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        const id = req.params.id;

        return Item.destroy({
            where: {
                id
            }
        })
            .then(() => res.status(200).send({ id }))
            .catch(error => res.status(400).send(error));
    }
}