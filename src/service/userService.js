const MyError = require("../constant/myError")
const UserModel = require("../model/userModel")

class UserService {
    async createUser(userName, password) {
        const user = await UserModel.create({
            username: userName,
            password: password
        })
        return user ? user.toJSON() : null
    }

    async getUserInfo({id, username, password, isAdmin}) {
        const whereOpt = {}

        id && Object.assign(whereOpt, { id })
        username && Object.assign(whereOpt, { username })
        password && Object.assign(whereOpt, { password })
        isAdmin && Object.assign(whereOpt, { isAdmin })

        const res = await UserModel.findOne({
            attributes: ['id', 'username', 'password', 'isAdmin'],
            where: whereOpt
        })
        console.log(`res=${res.dataValues}`);
        return res.dataValues
    }
}

module.exports = new UserService()