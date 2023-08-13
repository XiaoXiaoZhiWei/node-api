const { goodsFormatError } = require("../constant/errType")

async function goodsValidator(ctx, next) {
    try {
        ctx.verifyParams({
            name: { type: 'string', required: true },
            price: { type: 'number', required: true },
            num: { type: 'number', required: true },
            imageUrl: { type: 'string', required: true }
        });
    } catch (error) {
        console.error('校验商品参数失败', error);
        goodsFormatError.result = error
        ctx.app.emit('error', goodsFormatError, ctx)
        return
    }

    await next()
}

async function modifyGoodsValidator(ctx, next) {
    try {
        ctx.verifyParams({
            name: { type: 'string', required: false },
            price: { type: 'number', required: false },
            num: { type: 'number', required: false },
            imageUrl: { type: 'string', required: false }
        });
    } catch (error) {
        console.error('校验商品参数失败', error);
        goodsFormatError.result = error
        ctx.app.emit('error', goodsFormatError, ctx)
        return
    }

    await next()
}

async function findGoodsValidator(ctx, next) {
    try {
        ctx.verifyParams({
            pageNum: { type: 'number', required: false },
            pageSize: { type: 'number', required: false }
        });
    } catch (error) {
        console.error('校验商品参数失败', error);
        goodsFormatError.result = error
        ctx.app.emit('error', goodsFormatError, ctx)
        return
    }

    await next()
}

module.exports = {
    goodsValidator,
    modifyGoodsValidator,
    findGoodsValidator
}