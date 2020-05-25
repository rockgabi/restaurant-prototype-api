const Item = require('../models').OrderItem;
const Order = require('../models').Order;

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
    },
    async userCreate(req, res) {
        const user_id = req.user.id;
        const order_id = req.params.order_id;
        const data = Object.assign({}, req.body, { order_id, user_id });

        const order = await Order.findByPk(order_id);
        if (!order || order.user_id !== user_id)    return res.status(403).send({ error: 'order_access_forbidden' });

        return Item.create(data)
            .then(item => {
                res.status(201).send(item);
            })
            .catch(error => {
                res.status(400).send(error);
            });
    },
    async userUpdate(req, res) {
        const id = req.params.id;
        const user_id = req.user.id;
        const order_id = req.params.order_id;
        const data = Object.assign({}, req.body, { order_id, user_id });

        const order = await Order.findByPk(order_id);
        if (!order || order.user_id !== user_id)    return res.status(403).send({ error: 'order_access_forbidden' });

        return Item.update(
            data,
            { where: { id, order_id } }
        )
            .then(rowsAffected => Item.findOne({ id }).then(item => res.status(201).send(item)))
            .catch(error => res.status(400).send(error));
    },
    async userDelete(req, res) {
        const id = req.params.id;
        const user_id = req.user.id;
        const order_id = req.params.order_id;

        const order = await Order.findByPk(order_id);
        if (!order || order.user_id !== user_id)    return res.status(403).send({ error: 'order_access_forbidden' });

        return Item.destroy({
            where: {
                id, order_id
            }
        })
            .then(() => res.status(200).send({ id }))
            .catch(error => res.status(400).send(error));
    }
}