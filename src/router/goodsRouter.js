const Router = require("koa-router")
const { upload, publish, update, remove } = require("../controller/goodsController")
const { auth, hadAdminPermission } = require("../middleware/authMiddleware")
const { goodsValidator, modifyGoodsValidator } = require("../middleware/goodsMiddleware")

const router = new Router({ prefix: '/goods' })

// 上传图片
router.post("/upload", auth, hadAdminPermission, upload)
// 发布商品
router.post('/publish', auth, hadAdminPermission, goodsValidator, publish)
// 修改商品
router.put('/:id', auth, hadAdminPermission, modifyGoodsValidator, update)
// 删除商品
router.delete('/:id', auth, hadAdminPermission, remove)

module.exports = router