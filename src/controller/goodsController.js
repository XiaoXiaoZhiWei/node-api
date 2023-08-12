class GoodsController {
    async upload(ctx, next) {
        ctx.body = "上传图片"
    }
}

module.exports = new GoodsController()