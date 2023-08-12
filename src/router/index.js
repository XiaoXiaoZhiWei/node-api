const fs = require("node:fs")
const path = require("node:path")
const Router = require('koa-router')
const router = new Router()

const dirs = fs.readdirSync(__dirname)

const routers = dirs.filter((value, index, array) => {
    return value !== "index.js"
})
routers.forEach((value) => {
    const fileName = path.resolve(__dirname,`./${value}`)
    console.log("fileName=",fileName);
    const businessRouter = require(fileName)
    router.use(businessRouter.routes())
})

module.exports = router


