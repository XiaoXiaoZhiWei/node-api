const {createUser, getUserInfo} = require("../service/userService")

class UserController {
    async register(ctx, next) {
        //console.log(ctx.request.body);
        // 1. 获取数据
        const {username, password} = ctx.request.body
        // 合法性：用户名、密码不能为空
        if (!username || !password) {
            console.error("用户名或密码为空", ctx.request.body);
            ctx.status = 400
            ctx.body = {
                code: 10001,
                message: "用户名或密码为空",
                result:''
            }
            return
        }
        // 合理性: 用户名不能重复
        const user = await getUserInfo({ username })
        if (user.username === username) {
            ctx.status = 409
            ctx.body = {
                code: 10002,
                message: "用户已经存在",
                result:''
            }
            return
        }
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