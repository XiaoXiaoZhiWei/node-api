const Router = require("koa-router")
const { upload } = require("../controller/goodsController")
const { auth } = require("../middleware/authMiddleware")

const router = new Router({ prefix: '/goods' })

router.post("/upload", auth, upload)

module.exports = router