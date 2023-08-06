const Router = require("koa-router")
const {register} = require("../controller/userController")
const {userValidator, verifyUser} = require("../middleware/userMiddleware")

const router = new Router({ prefix: '/users' })

// 注册接口
router.post('/register', userValidator, verifyUser, register)

module.exports = router