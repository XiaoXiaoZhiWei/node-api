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
        console.log('updateGoods.res=', res[0]);
        return res[0] > 0 ? true : false
    }

    async deleteGoods(id) {
        const res = await Goods.destroy({
            where: {
                id
            }
        });
        console.log('deleteGoods.res=', res);
        return res === 1 ? true : false
    }

    async restoreGoods(id) {
        const res = await Goods.restore({
            where: {
                id
            }
        });
        console.log('restoreGoods.res=', res);
        return res === 1 ? true : false
    }

    async findAllGoods(pageNum, pageSize) {
        const offset = (pageNum - 1) * pageSize
        const {count, rows} = await Goods.findAndCountAll({ offset: offset, limit: pageSize * 1 })
        console.log('findAllGoods.res=', rows);
        return {
            pageNum,
            pageSize,
            total: count,
            list: rows,
        }
    }
}

module.exports = new GoodsService()