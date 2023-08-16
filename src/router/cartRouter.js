const Router = require("koa-router")
const router = new Router({ prefix: "/cart"})
const { auth } = require("../middleware/authMiddleware")
const { validator } = require("../middleware/cartMiddleware")
const { add } = require("../controller/cartController")

router.post('/add', auth, validator, add)

module.exports = router