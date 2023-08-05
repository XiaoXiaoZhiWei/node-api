const app = require("./app/index")
const config = require("../config/default")

const port = config.APP_PORT
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})
