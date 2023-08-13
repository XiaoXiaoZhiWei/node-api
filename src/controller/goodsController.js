const { fileUploadError, unSupportedFileType } = require("../constant/errType")
const path = require("node:path")

class GoodsController {
    async upload(ctx, next) {
        const { file } = ctx.request.files
        console.log('file=', file.newFilename);
        console.log('path=', file.filepath);
        const fileTypes = ['image/jpeg', 'image/png']

        if (file) {
            if (!fileTypes.includes(file.mimetype)) {
                return ctx.app.emit('error', unSupportedFileType, ctx)
            }
            ctx.body = {
                code: 0,
                message: '商品图片上传成功',
                result: {
                    goods_img: path.basename(file.filepath),
                },
            }
        } else {
            return ctx.app.emit('error', fileUploadError, ctx)
        }
    }

    async publish(ctx, next) {
        ctx.body = "发布成功"
    }
}

module.exports = new GoodsController()