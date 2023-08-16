const { addCartFormatError } = require("../constant/errType")

const validator = async function(ctx, next) {
    console.log('query=',ctx.query);
    try {
        ctx.verifyParams({
            goods_id: 'number'
        });
    } catch (error) {
        console.error('校验商品参数失败', error);
        addCartFormatError.result = error
        ctx.app.emit('error', addCartFormatError, ctx)
        return
    }

    await next()
}

module.exports = {
    validator
}