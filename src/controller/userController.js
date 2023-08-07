const { createUser, getUserInfo } = require("../service/userService")
const {createUserError} = require("../constant/errType")

class UserController {
    async register(ctx, next) {
        //console.log(ctx.request.body);
        // 1. 获取数据
        const { username, password } = ctx.request.body
        try {
            // 2. 操作数据库
            const res = await createUser(username, password)
            if (res) {
                // 3. 返回结果
                ctx.body = {
                    code: 0,
                    message: "注册成功",
                    result: {
                        id: res.id,
                        username: res.username
                    }
                }
            } else {
                console.error(`用户为空`);
                ctx.app.emit('error', createUserError, ctx)
            }
        } catch (error) {
            console.error(`用户创建错误=${error}`);
            ctx.app.emit('error', createUserError, ctx)
        }
    }

    async login(ctx, next) {
        ctx.body = '登录成功'
    }
}

module.exports = new UserController()