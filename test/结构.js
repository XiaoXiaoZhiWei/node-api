const MyError = require("../src/constant/myError")
const createUserError = {
    code: 10004,
    message: '数据库用户对象创建错误',
    result: '',
}

new MyError(createUserError)