const User = require('../models').User;
const Product = require('../models').Product;
const Favorite = require('../models').Favorite;

module.exports = {
    async fetch(req, res) {
        const userId = req.params.user_id;
        const productId = req.body.product_id;
        const favorited = req.body.favorited;

        const user = await User.findByPk(userId, {
            include: [
                { model: Product, as: 'products', through: 
                    {
                        model: Favorite,
                    } 
                }
            ]
        });
       
        return res.status(200).send(user);
    },

    async create(req, res) {
        const userId = req.params.user_id;
        const productId = req.body.product_id;

        const user = await User.findByPk(userId);
        const product = await Product.findByPk(productId);

        if (user && product) {
            Favorite.create({
                user_id: userId,
                product_id: productId
            })
        }

        return res.status(200).send(user);
    },

    async delete(req, res) {
        const userId = req.params.user_id;
        const productId = req.body.product_id;

        const user = await User.findByPk(userId);
        const product = await Product.findByPk(productId);

        if (user && product) {
            Favorite.destroy({
                where: {
                    user_id: userId,
                    product_id: productId
                }
            });
        }

        return res.status(200).send(null);
    },
}