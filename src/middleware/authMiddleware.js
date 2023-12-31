const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../../config/default")
const { tokenExpiredError, invalidToken, hasNotAdminPermission } = require("../constant/errType")

const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    console.log(token)
    try {
        const user = jwt.verify(token, JWT_SECRET);
        ctx.state.user = user
    } catch (err) {
        // err
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token已过期', err)
                return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenError':
                console.error('无效的token', err)
                return ctx.app.emit('error', invalidToken, ctx)
        }
    }

    await next()
}

const hadAdminPermission = async (ctx, next) => {
    const { isAdmin } = ctx.state.user
    if (!isAdmin) {
        console.error('error', "没有管理员权限");
        return ctx.emit('error', hasNotAdminPermission, ctx)
    }
    await next()
}

module.exports = {
    auth,
    hadAdminPermission
}