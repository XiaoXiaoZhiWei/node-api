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
    modifyPasswordError: {
        code: 10011,
        message: '修改密码失败',
        result: '',
    },
    passwordFormatError: {
        code: 10012,
        message: "密码不合法",
        result: ''
    },
    hasNotAdminPermission: {
        code: 10013,
        message: "没有管理员权限",
        result: ''
    },
    fileUploadError: {
        code: '10201',
        message: '商品图片上传失败',
        result: '',
    },
    unSupportedFileType: {
        code: '10202',
        message: '不支持的文件格式',
        result: '',
    },
    goodsFormatError: {
        code: '10203',
        message: '商品参数格式错误',
        result: '',
    },
    publishGoodsError: {
        code: '10204',
        message: '商品发布失败',
        result: '',
    },
    updateGoodsError: {
        code: '10205',
        message: '商品修改失败',
        result: '',
    },
    deleteGoodsError: {
        code: '10206',
        message: '商品下架失败',
        result: '',
    },
    invalidGoodsID: {
        code: '10207',
        message: '无效的商品id',
        result: '',
    },
    findGoodsListError: {
        code: '10208',
        message: '商品列表获取失败',
        result: '',
    },
    addCartFormatError: {
        code: '10209',
        message: '校验商品参数失败',
        result: '',
    }
}