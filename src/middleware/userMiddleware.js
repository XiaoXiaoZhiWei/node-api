const { getUserInfo } = require("../service/userService")
const { 
    userFormatError, 
    userAlreadyExited, 
    getUserInfoError, 
    userDoesNotExist, 
    userLoginError, 
    invalidPassword
} = require("../constant/errType")
const bcrypt = require('bcryptjs');

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

// 登录验证
async function verifyLogin(ctx, next) {
    const { username, password } = ctx.request.body
    try {
        // 1、验证用户是否存在
        const user = await getUserInfo({ username })
        if (!user) {
            console.error(`登录用户不存在=${username}`);
            ctx.app.emit('error', userDoesNotExist, ctx)
            return
        }
        // 2. 密码是否匹配(不匹配: 报错)
        if (!bcrypt.compareSync(password, user.password)) {
            ctx.app.emit('error', invalidPassword, ctx)
            return
        }
    } catch (error) {
        console.error(`用户获取失败=${error}`);
        ctx.app.emit('error', userLoginError, ctx)
        return
    }

    await next()
}

module.exports = {
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin
}