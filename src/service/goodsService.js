const Goods = require("../model/goodsModel")

class GoodsService {

    async publishGoods(goods) {
        const res = await Goods.create(goods)
        return res.dataValues
    }

    async updateGoods(id, goods) {
        const res = await Goods.update(goods, {
            where: {
                id
            }
        });
        console.log('updateGoods.res=',res[0]);
        return res[0] > 0 ? true : false
    }
}

module.exports = new GoodsService()