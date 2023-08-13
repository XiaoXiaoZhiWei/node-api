const { fileUploadError, unSupportedFileType } = require("../constant/errType")
const path = require("node:path")

const { publishGoods, updateGoods } = require("../service/goodsService")
const { publishGoodsError, updateGoodsError } = require("../constant/errType")

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
        // 1、获取参数
        // 2、写入数据库。（1、建表 2、插入数据方法）
        try {
            const { updatedAt, createdAt, ...res } = await publishGoods(ctx.request.body)
            // 3、返回结果
            ctx.body = {
                code: 0,
                message: "发布商品成功",
                result: res
            }
        } catch (error) {
            console.error("发布商品失败", error);
            return ctx.app.emit('error', publishGoodsError, ctx)
        }
    }

    async update(ctx, next) {
        ctx.body = "更新商品成功"
        const goodId = ctx.params.id
        const goodsModel = ctx.request.body
        try {
            const res = await updateGoods(goodId, goodsModel)
            if (res) {
                ctx.body = {
                    code: 0,
                    message: "修改商品成功",
                    result: res
                }
            } else {
                ctx.app.emit('error', updateGoodsError, ctx)
            }
        } catch (error) {
            console.error("修改商品失败", error);
            return ctx.app.emit('error', updateGoodsError, ctx)
        }
    }
}

module.exports = new GoodsController()