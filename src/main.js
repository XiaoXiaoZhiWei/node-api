const Koa = require("koa")

const app = new Koa()

app.use((ctx, next) => {
    ctx.body = '你好 '
})

const port = 3000
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})
