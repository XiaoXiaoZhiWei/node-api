const Koa = require("koa")
const { koaBody } = require('koa-body');
const router = require("../router/index")
const errHandle = require("./errHandle")

const app = new Koa()

app.use(koaBody());
app.use(router.routes())

app.on('error', errHandle)

module.exports = app