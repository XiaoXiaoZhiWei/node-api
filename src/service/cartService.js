const { Op } = require('sequelize')
const Cart = require("../model/cartModel")

class CartService {
    async createOrUpdateCart(user_id, goods_id) {
        // 如果有该商品，那就加一
        // 如果没有，需要添加一条数据。（该商品ID必须在商品表存在，并且该商品是未被删除的。抽取来为中间件）
        const res = await Cart.findOne({
            where: {
                [Op.and]: {
                    user_id,
                    goods_id
                },
            }
        })
        if (res) {
            await res.increment('num')
            return await res.reload()
        } else {
            return await Cart.create({
                user_id,
                goods_id,
            })
        }
    }
}

module.exports = new CartService()