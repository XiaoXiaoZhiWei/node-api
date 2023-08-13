const Goods = require("../model/goodsModel")

class GoodsService {

    async publishGoods(goods) {
        const res = await Goods.create(goods)
        return res.dataValues
    }
}

module.exports = new GoodsService()