const Router = require("koa-router")
const { register, login } = require("../controller/userController")
const { 
    userValidator,
    verifyUser,
    crpytPassword,
    verifyLogin
} = require("../middleware/userMiddleware")

const router = new Router({ prefix: '/users' })

// 注册接口
router.post('/register', userValidator, verifyUser, crpytPassword, register)
// 登录接口
router.post('/login', userValidator, verifyLogin, login)

module.exports = router