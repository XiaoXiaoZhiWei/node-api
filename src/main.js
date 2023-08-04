const Koa = require("koa")
const config = require("../config/default")
const app = new Koa()

app.use((ctx, next) => {
    ctx.body = 'Hello world'
})

const port = config.APP_PORT
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})
