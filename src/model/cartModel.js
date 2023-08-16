const { DataTypes } = require('sequelize');
const seq = require("../db/seq")

// seq.define会返回模型
const Cart = seq.define('Cart', {
    user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "用户ID"
    },
    goods_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "商品ID"
    },
    num: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
        comment: "购物车数量"
    },
    selected: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
        comment: "是否选中"
    },
}, {
  tableName: 'Cart',
  paranoid: true
});

//Goods.sync({ force: true });
Cart.sync();
console.log("购物车模型表刚刚(重新)创建！");

module.exports = Cart