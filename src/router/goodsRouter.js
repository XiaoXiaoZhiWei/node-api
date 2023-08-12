const Router = require("koa-router")
const { upload } = require("../controller/goodsController")
const { auth, hadAdminPermission } = require("../middleware/authMiddleware")

const router = new Router({ prefix: '/goods' })

router.post("/upload", auth, hadAdminPermission, upload)

module.exports = router