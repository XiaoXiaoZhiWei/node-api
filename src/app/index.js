const Koa = require("koa")
const { koaBody } = require('koa-body');
const router = require("../router/index")
const errHandle = require("./errHandle")
const koaStatic = require("koa-static")
const path = require("node:path")
const parameter = require('koa-parameter');

const app = new Koa()

app.use(
    koaBody({
        multipart: true,
        formidable: {
            // 在配制选项option里, 不推荐使用相对路径
            // 在option里的相对路径, 不是相对的当前文件. 相对process.cwd()
            uploadDir: path.join(__dirname, '../upload'),
            keepExtensions: true,
        },
    })
)
app.use(koaStatic(path.resolve(__dirname, "../upload")))

app.use(parameter(app));
app.use(router.routes())

app.on('error', errHandle)

module.exports = app