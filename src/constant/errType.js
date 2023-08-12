module.exports = {
    userFormatError: {
        code: 10001,
        message: "用户名或密码为空",
        result: ''
    },
    userAlreadyExited: {
        code: 10002,
        message: "用户已经存在",
        result: ''
    },
    userRegisterError: {
        code: 10003,
        message: '用户注册错误',
        result: '',
    },
    createUserError: {
        code: 10004,
        message: '数据库用户对象创建错误',
        result: '',
    },
    getUserInfoError: {
        code: 10005,
        message: '数据库用户对象获取错误',
        result: '',
    },
    userDoesNotExist: {
        code: 10006,
        message: '用户不存在',
        result: '',
    },
    userLoginError: {
        code: 10007,
        message: '用户登录失败',
        result: '',
    },
    invalidPassword: {
        code: 10008,
        message: '密码不匹配',
        result: '',
    },
    tokenExpiredError: {
        code: 10009,
        message: '过期的token',
        result: '',
    },
    invalidToken: {
        code: 10010,
        message: '无效的token',
        result: '',
    },
}