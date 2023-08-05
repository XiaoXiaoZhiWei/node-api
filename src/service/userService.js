class UserService {
    async createUser(userName, password) {
        return "写入数据库成功"
    }
}

module.exports = new UserService()