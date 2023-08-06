const {createUser} = require("../service/userService")

class UserController {
    async register(ctx, next) {
        //console.log(ctx.request.body);
        // 1. 获取数据
        const {username, password} = ctx.request.body
        // 2. 操作数据库
        const res = await createUser(username, password)
        // 3. 返回结果
        ctx.body = {
            code: 0,
            message: "注册成功",
            result: {
                id: res.id,
                username: res.username
            }
        }
    }
}

module.exports = new UserController()