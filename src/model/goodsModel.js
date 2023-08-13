const { DataTypes } = require('sequelize');
const seq = require("../db/seq")

// seq.define会返回模型
const Goods = seq.define('Goods', {
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "商品名"
    },
    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
        comment: "商品价格"
    },
    num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "商品库存"
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false,
        comment: "商品图像"
    },
}, {
  tableName: 'Goods'
});

Goods.sync();
console.log("商品模型表刚刚(重新)创建！");

module.exports = Goods