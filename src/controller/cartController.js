const { createOrUpdateCart } = require("../service/cartService")
const { addCartError } = require("../constant/errType")

class CartController {
    async add(ctx, next) {
        // 获取参数
        const user_id = ctx.state.user.id
        const { goods_id } = ctx.request.body
        console.log('userId=',ctx.state.user);
        // 操作数据库
        try {
            let res = await createOrUpdateCart(user_id, goods_id)
            // 返回数据
            ctx.body = {
                code: 1,
                message: "添加成功",
                result: res
            }
        } catch (error) {
            console.error('添加商品失败',error);
            ctx.app.emit('error', addCartError, ctx)
        }
        
    }
}

module.exports = new CartController()