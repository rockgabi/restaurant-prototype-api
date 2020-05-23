const Status = require('../models').OrderStatus;

module.exports = {
    fetch(req, res) {
        return Status.findAll()
            .then(statuses => {
                res.status(200).send(statuses);
            })
            .catch(error => {
                res.status(400).send(error);
            });
    },
    create(req, res) {
        const data = Object.assign({}, req.body);

        return Status.create(data)
            .then(status => {
                res.status(201).send(status);
            })
            .catch(error => {
                res.status(400).send(error);
            });
    },
    update(req, res) {
        const id = req.params.id;
        const data = Object.assign({}, req.body);
        delete data.id;

        return Status.update(
            data,
            { where: { id } }
        )
            .then(rowsAffected => Status.findOne({ id }).then(status => res.status(201).send(status)))
            .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        const id = req.params.id;

        return Status.destroy({
            where: {
                id
            }
        })
            .then(() => res.status(200).send({ id }))
            .catch( error => res.status(400).send(error));
    }
}