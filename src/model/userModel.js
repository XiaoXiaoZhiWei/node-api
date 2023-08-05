const { DataTypes } = require('sequelize');
const seq = require("../db/seq")

// seq.define会返回模型
const User = seq.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "用户名"
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: "密码"
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: "是否为管理员, 0: 不是管理员(默认); 1: 是管理员"
    }
}, {
  tableName: 'User'
});

User.sync();
console.log("用户模型表刚刚(重新)创建！");

module.exports = User