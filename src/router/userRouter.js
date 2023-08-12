const Router = require("koa-router")
const { register, login } = require("../controller/userController")
const { 
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin
} = require("../middleware/userMiddleware")
const { auth } = require("../middleware/authMiddleware")

const router = new Router({ prefix: '/users' })

// 注册接口
router.post('/register', userValidator, verifyUser, crpytPassword, register)
// 登录接口
router.post('/login', userValidator, verifyLogin, login)
// 修改密码接口
router.patch('/modifyPassword', auth, (ctx, next) => {
    console.log(ctx.state.user)
    ctx.body = '修改密码成功'
})
module.exports = router