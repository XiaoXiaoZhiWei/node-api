const Koa = require("koa")
const userRouter = require("./router/userRouter")
const config = require("../config/default")
const app = new Koa()

app.use(userRouter.routes())

const port = config.APP_PORT
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})
