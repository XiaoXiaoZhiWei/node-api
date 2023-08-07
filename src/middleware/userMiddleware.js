const { getUserInfo } = require("../service/userService")
const { userFormatError, userAlreadyExited, getUserInfoError} = require("../constant/errType")
const bcrypt = require('bcryptjs')

async function userValidator(ctx, next) {
    const { username, password } = ctx.request.body
    // 合法性：用户名、密码不能为空
    if (!username || !password) {
        console.error("用户名或密码为空", ctx.request.body);
        ctx.app.emit('error', userFormatError, ctx)
        return
    }

    await next()
}

async function verifyUser(ctx, next) {
    const { username } = ctx.request.body
    // 合理性: 用户名不能重复
    try {
        const user = await getUserInfo({ username })
        if (user && user.username === username) {
            console.error(`用户存在=${username}`);
            ctx.app.emit('error', userAlreadyExited, ctx)
            return
        }
    } catch (error) {
        console.error(`用户获取失败=${error}`);
        ctx.app.emit('error', getUserInfoError, ctx)
        return
    }

    await next()
}

async function crpytPassword(ctx, next) {
    const { password } = ctx.request.body
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    console.log(`hash=${hash}`);
    ctx.request.body.password = hash

    await next()
}

module.exports = {
    userValidator,
    verifyUser,
    crpytPassword
}