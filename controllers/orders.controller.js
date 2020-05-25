const Order = require('../models').Order;
const OrderItem = require('../models').OrderItem;

module.exports = {
    fetch(req, res) {
        return Order.findAll({
            include: [
                OrderItem
            ]
        })
            .then(orders => {
                res.status(200).send(orders);
            })
            .catch(error => {
                res.status(400).send(error);
            });
    },
    create(req, res) {
        const data = Object.assign({}, req.body);

        data.requested_time = new Date();
        data.description = '';
        data.payment_type = data.payment_type ? data.payment_type : 'cash';
        data.amount = data.amount ? data.amount : 0;

        return Order.create(data)
            .then(order => {
                res.status(201).send(order);
            })
            .catch(error => {
                res.status(400).send(error);
            });
    },
    update(req, res) {
        const id = req.params.id;
        const data = Object.assign({}, req.body);
        delete data.id;

        return Order.update(
            data,
            { where: { id } }
        )
            .then(rowsAffected => Order.findOne({ id }).then(order => res.status(201).send(order)))
            .catch(error => res.status(400).send(error));
    },
    delete(req, res) {
        const id = req.params.id;

        return Order.destroy({
            where: {
                id
            }
        })
            .then(() => res.status(200).send({ id }))
            .catch( error => res.status(400).send(error));
    },
    userFetch(req, res) {
        const user = req.user;

        return Order.findAll({
            include: [
                OrderItem
            ],
            where: {
                user_id: user.id
            }
        })
            .then(orders => {
                res.status(200).send(orders);
            })
            .catch(error => {
                res.status(400).send(error);
            });
    },
    userCreate(req, res) {
        const user = req.user;
        const data = Object.assign({}, req.body);

        data.requested_time = new Date();
        data.status_id = data.status_id ? data.status_id : 1;
        data.description = '';
        data.payment_type = data.payment_type ? data.payment_type : 'cash';
        data.amount = data.amount ? data.amount : 0;
        data.user_id = user.id;

        return Order.create(data)
            .then(order => {
                res.status(201).send(order);
            })
            .catch(error => {
                res.status(400).send(error);
            });
    },
    userUpdate(req, res) {
        const user = req.user;
        const id = req.params.id;
        const data = Object.assign({}, req.body);
        delete data.id;

        return Order.update(
            data,
            { where: { id, user_id: user.id } }
        )
            .then(rowsAffected => Order.findOne({ id }).then(order => res.status(201).send(order)))
            .catch(error => res.status(400).send(error));
    },
    userDelete(req, res) {
        const user = req.user;
        const id = req.params.id;

        return Order.destroy({
            where: {
                id,
                user_id: user.id
            }
        })
            .then(() => res.status(200).send({ id }))
            .catch( error => res.status(400).send(error));
    },
}