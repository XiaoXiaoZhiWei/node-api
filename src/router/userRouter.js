const Router = require("koa-router")
const {register} = require("../controller/userController")
const {userValidator, verifyUser, crpytPassword} = require("../middleware/userMiddleware")

const router = new Router({ prefix: '/users' })

// 注册接口
router.post('/register', userValidator, verifyUser, crpytPassword, register)

module.exports = router