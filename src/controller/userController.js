const { createUser, getUserInfo } = require("../service/userService")
const {createUserError, userLoginError} = require("../constant/errType")
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../../config/default")

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
        const { username } = ctx.request.body
        try {
            const { password, ...res} = await getUserInfo({ username })
            const token = jwt.sign(res, JWT_SECRET, { expiresIn: '2s'})
            console.log("token=",token);
            ctx.body = {
                code: 0,
                message: "登录成功",
                token: token
            }
        } catch (error) {
            console.error('用户登录失败', error);
            ctx.app.emit('error', userLoginError, ctx)
        }
    }
}

module.exports = new UserController()