const Router = require("koa-router")
const { register, login, modifyPassword} = require("../controller/userController")
const { 
    userValidator,
    passwordValidator,
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
router.patch('/modifyPassword', passwordValidator, auth, crpytPassword, modifyPassword)

module.exports = router