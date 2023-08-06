const Koa = require("koa")
const { koaBody } = require('koa-body');
const userRouter = require("../router/userRouter")
const errHandle = require("./errHandle")

const app = new Koa()

app.use(koaBody());
app.use(userRouter.routes())

app.on('error', errHandle)

module.exports = app