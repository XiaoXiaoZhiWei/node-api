const Router = require("koa-router")
const { upload, publish } = require("../controller/goodsController")
const { auth, hadAdminPermission } = require("../middleware/authMiddleware")
const { goodsValidator } = require("../middleware/goodsMiddleware")

const router = new Router({ prefix: '/goods' })

// 上传图片
router.post("/upload", auth, hadAdminPermission, upload)
// 发布商品
router.post('/publish', goodsValidator, publish)

module.exports = router