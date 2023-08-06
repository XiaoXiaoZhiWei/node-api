const UserModel = require("../model/userModel")

class UserService {
    async createUser(userName, password) {
        const user = await UserModel.create({
            username: userName,
            password: password
        })
        return user.toJSON()
    }
}

module.exports = new UserService()