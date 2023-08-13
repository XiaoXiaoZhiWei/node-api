

# 01-项目初始化

## 1 npm初始化 

```
npm init -y
```

生成package.json文件

package.json文件：是管理第三方库，项目依赖的配置文件。

## 2 git初始化 

```
git init
```

生成.git隐藏文件夹 ，git的本地仓库，用来代码版本管理。

.gitignore文件：忽略一些文件不让上传，减少不必要资源浪费。

## 3 创建ReadMe文件

记录每次版本修改的内容。

# 02-项目基础搭建

## 1 安装Koa框架

`npm i koa`

## 2 编写最基本的app

```
const Koa = require("koa")
const app = new Koa()

app.use((ctx, next) => {
    ctx.body = '你好 '
})

const port = 3000
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})
```

## 3 测试

在终端, 使用`node src/main.js`

# 03-项目的基本优化

## 1 自动重启服务

`npm i nodemon -D` 

nodemon ：判断文件是否更改，然后重启服务器，避免重复关闭重启。类似热更新。

编写`package.json`脚本

```json
"scripts": {
  "dev": "nodemon ./src/main.js",
  "test": "echo \"Error: no test specified\" && exit 1"
},
```

执行`npm run dev`启动服务

## 2 读取配置文件

dotenv作用：把.env文件中的键值对注入到process.env的对象中。(读取根目录中的`.env`文件, 将配置写`process.env`中)

1 安装`dotenv`

```
npm i dotenv
```

2 创建`.env`文件

```
APP_PORT=8000
```

3 创建`src/config/default.js`

```js
const dotenv = require('dotenv')

dotenv.config()

// console.log(process.env.APP_PORT)

module.exports = process.env
```

4 改写`main.js`

```js 
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
```

# 04-添加路由

路由: 映射关系。请求路径 -- 处理函数之间映射关系。

## 1 安装koa-router

```
npm i koa-router
```

步骤:

1. 导入包
2. 实例化对象
3. 编写路由
4. 注册中间件

##  2 编写路由

创建`src/router`目录, 编写`userRoute.js`

```js
const Router = require("koa-router")
const router = new Router()

router.get('/', (ctx, next) => {
    ctx.body = 'Hello world !'
})

module.exports = router
```

## 3 改写main.js

```js
const Koa = require("koa")
const userRouter = require("./router/userRouter")
const config = require("../config/default")
const app = new Koa()

app.use(userRouter.routes())

const port = config.APP_PORT
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})
```

# 05-目录结构优化

## 1 将http服务和app业务拆分

创建`src/app/index.js`

```js
const Koa = require("koa")
const userRouter = require("../router/userRouter")
const app = new Koa()

app.use(userRouter.routes())

module.exports = app
```

改写`main.js`

```js
const app = require("./app/index")
const config = require("../config/default")

const port = config.APP_PORT
app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
})

```

## 2 将路由和控制器拆分

路由: 解析URL, 对应的方法把这块拆分到控制器。

控制器: 处理不同的业务

1、 在controller文件夹下新建`UserController`

```js
class UserController {
    async register(ctx, next) {
        ctx.body = "注册成功"
    }
}

module.exports = new UserController()
```

2、导入controller获取注册函数，建立url和hanlder之间关系。

```js
const Router = require("koa-router")
const {register} = require("../controller/userController")

const router = new Router({ prefix: '/users' })

// 注册接口
router.post('/register', register)

module.exports = router
```

# 06- 解析body

## 1 安装koa-body

`npm install koa-body`

## 2 注册中间件

```js
const { koaBody } = require('koa-body');
const userRouter = require("../router/userRouter")

const app = new Koa()

app.use(koaBody());
app.use(userRouter.routes())

module.exports = app
```

## 3 解析请求数据

```js
ctx.request.body
```

## 4 拆分service层

service层主要是做数据库处理

在service文件夹下新建`userService`文件

```js
class UserService {
    async createUser(userName, password) {
        return "写入数据库成功"
    }
}

module.exports = new UserService()
```

在controller层调用数据库方法

```js
const {createUser} = require("../service/userService")

class UserController {
    async register(ctx, next) {
        //console.log(ctx.request.body);
        // 1. 获取数据
        const {username, password} = ctx.request.body
        // 2. 操作数据库
        const res = await createUser(username, password)
        console.log(res)
        // 3. 返回结果
        ctx.body = {
            code: 0,
            message: "注册成功",
            result: ctx.request.body
        }
    }
}

module.exports = new UserController()
```

# 07-数据库操作

sequelize ORM数据库工具

ORM: 对象关系映射,对象和sql概念之间进行映射。

| 对象 | 数据表     |
| ---- | ---------- |
| 类   | 表名       |
| 实例 | 一条条记录 |
| 属性 | 表的字段名 |
| 方法 | 操作       |

## 1 安装sequelize

`npm i sequelize`

所选数据库安装驱动程序

`npm i mysql2 # MySQL`

## 2 连接数据库

```js
const sequelize = new Sequelize(MYSQL_DB, MYSQL_USER, MYSQL_PWD, {
    host: MYSQL_HOST,
    dialect: 'mysql'
});
```

## 3 测试连接情况

```js
sequelize.authenticate()
.then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
})
```

# 08-创建User模型

## 1 拆分Model层

sequelize主要通过Model同步进行创建对应数据表

```js
const { DataTypes } = require('sequelize');
const seq = require("../db/seq")

// seq.define会返回模型
// id 会被sequelize自动创建, 管理
const User = seq.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        comment: "用户名"
    },
    password: {
        type: DataTypes.CHAR(64),
        allowNull: false,
        comment: "密码"
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
        comment: "是否为管理员, 0: 不是管理员(默认); 1: 是管理员"
    }
}, {
  tableName: 'User'
});

User.sync();
console.log("用户模型表刚刚(重新)创建！");

module.exports = User
```

# 09-添加用户入库

所有数据库的操作都在Service层完成, Service调用Model完成数据库操作

## 1 插入数据

```js
const user = await UserModel.create({
            username: userName,
            password: password
        })
```

## 2 获取返回值

返回是promise，并解析

```js
return user.toJSON()
```

## 3 返回结果给response

```js
class UserController {
    async register(ctx, next) {
        //console.log(ctx.request.body);
        // 1. 获取数据
        const {username, password} = ctx.request.body
        // 2. 操作数据库
        const res = await createUser(username, password)
        // 3. 返回结果
        ctx.body = {
            code: 0,
            message: "注册成功",
            result: {
                id: res.id,
                username: res.username
            }
        }
    }
}
```

# 10-错误处理

## 1 合法性

```js
// 合法性：用户名、密码不能为空
if (!username || !password) {
    console.error("用户名或密码为空", ctx.request.body);
    ctx.status = 400
    ctx.body = {
        code: 10001,
        message: "用户名或密码为空",
        result:''
    }
    return
}
```

## 2 合理性

```js
async getUserInfo({id, username, password, isAdmin}) {
    const whereOpt = {}

    id && Object.assign(whereOpt, { id })
    username && Object.assign(whereOpt, { username })
    password && Object.assign(whereOpt, { password })
    isAdmin && Object.assign(whereOpt, { isAdmin })

    const res = await UserModel.findOne({
        attributes: ['id', 'username', 'password', 'isAdmin'],
        where: whereOpt
    })
    return res.toJSON()
}
```

```js
// 合理性: 用户名不能重复
const user = await getUserInfo({ username })
if (user.username === username) {
    ctx.status = 409
    ctx.body = {
        code: 10002,
        message: "用户已经存在",
        result:''
    }
    return
}
```

# 11-拆分中间件

为了使代码的逻辑更加清晰, 我们可以拆分一个中间件层, 封装多个中间件函数

## 1 拆分中间件

```js
async function userValidator(ctx, next) {
    const {username, password} = ctx.request.body
    // 合法性：用户名、密码不能为空
    if (!username || !password) {
        console.error("用户名或密码为空", ctx.request.body);
        ctx.status = 400
        ctx.body = {
            code: 10001,
            message: "用户名或密码为空",
            result:''
        }
        return
    }

    await next()
}
```

路由添加具体中间件

```js
const Router = require("koa-router")
const {register} = require("../controller/userController")
const {userValidator, verifyUser} = require("../middleware/userMiddleware")

const router = new Router({ prefix: '/users' })

// 注册接口
router.post('/register', userValidator, verifyUser, register)

module.exports = router
```

## 2 统一错误处理

- 在出错的地方使用`ctx.app.emit`提交错误
- 在app中通过`app.on`监听

编写统一的错误定义文件

```js
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
    }
}
```

发送错误

```js
async function userValidator(ctx, next) {
    const {username, password} = ctx.request.body
    // 合法性：用户名、密码不能为空
    if (!username || !password) {
        console.error("用户名或密码为空", ctx.request.body);
        ctx.app.emit('error', userFormatError, ctx)
        return
    }

    await next()
}
```

监听错误并处理

```js
app.on('error', errHandle)
```

新建错误处理函数

```js
function errHandle(err, ctx) {
    var status = 500
        switch (err.code) {
            case 10001:
                status = 400
                break;
            case 10002:
                status = 409
                break;
            default:
                status = 500
                break;
        }
        ctx.status = status
        ctx.body = err
}

module.exports = {
    errHandle
}
```

# 12-密码加密

在将密码保存到数据库之前, 要对密码进行加密处理

123123abc (加盐) 加盐加密

## 1 安装bcryptjs

`npm i bcryptjs `

## 2 编写加密中间件

```js
async function crpytPassword(ctx, next) {
    const {password} = ctx.request.body
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(password, salt);
    ctx.request.body.password = hash

    await next()
}
```

##  3 在router中使用

```js
// 注册接口
router.post('/register', userValidator, verifyUser, crpytPassword, register)
```

# 12-1错误处理补充

await 返回的是一个promise对象。

需要处理错误。用`try catch`

```js
  async function verifyUser(ctx, next) {
    const { username } = ctx.request.body
    // 合理性: 用户名不能重复
    try {
        const user = await getUserInfo({ username })
        if (user && user.username === username) {
            console.error(`用户存在=${username}`);
            ctx.app.emit('error', userAlreadyExited, ctx)
            return
        }
    } catch (error) {
        console.error(`用户获取失败=${error}`);
        ctx.app.emit('error', getUserInfoError, ctx)
        return
    }

    await next()
  }
```

# 13-验证登录

流程: 

- 验证格式
- 验证用户是否存在
- 验证密码是否匹配

```js
// 登录验证
async function verifyLogin(ctx, next) {
    const { username, password } = ctx.request.body
    try {
        // 1、验证用户是否存在
        const user = await getUserInfo({ username })
        if (!user) {
            console.error(`登录用户不存在=${username}`);
            ctx.app.emit('error', userDoesNotExist, ctx)
            return
        }
        // 2. 密码是否匹配(不匹配: 报错)
        if (!bcrypt.compareSync(password, user.password)) {
            ctx.app.emit('error', invalidPassword, ctx)
            return
        }
    } catch (error) {
        console.error(`用户获取失败=${error}`);
        ctx.app.emit('error', userLoginError, ctx)
        return
    }

    await next()
}
```

# 14-用户的认证

登录成功后, 给用户颁发一个令牌token, 用户在以后的每一次请求中携带这个令牌. 

jwt: jsonwebtoken

- header: 头部
- payload: 载荷
- signature: 签名

## 1 颁发token

### 1) 安装jsonwebtoken

`npm i jsonwebtoken`

### 2) 在控制器中改写login方法

```js
 async login(ctx, next) {
        const { username } = ctx.request.body
        try {
            const { password, ...res} = await getUserInfo({ username })
            const token = jwt.sign(res, JWT_SECRET, { expiresIn: '2s'})
            console.log("token=",token);
            ctx.body = {
                code: 0,
                message: "登录成功",
                token: token
            }
        } catch (error) {
            console.error('用户登录失败', error);
            ctx.app.emit('error', userLoginError, ctx)
        }
    }
```

### 3) 定义私钥

在`.env`定义

```
JWT_SECRET = czw_14.,+==3q
```

## 2 用户认证

### 1) 创建auth中间件

```js
const jwt = require("jsonwebtoken")
const { JWT_SECRET } = require("../../config/default")
const { tokenExpiredError, invalidToken } = require("../constant/errType")

const auth = async (ctx, next) => {
    const { authorization } = ctx.request.header
    const token = authorization.replace('Bearer ', '')
    console.log(token)
    try {
        const user = jwt.verify(token, JWT_SECRET);
        ctx.state.user = user
    } catch (err) {
        // err
        switch (err.name) {
            case 'TokenExpiredError':
                console.error('token已过期', err)
                return ctx.app.emit('error', tokenExpiredError, ctx)
            case 'JsonWebTokenError':
                console.error('无效的token', err)
                return ctx.app.emit('error', invalidToken, ctx)
        }
    }

    await next()
}

module.exports = {
    auth
}
```

### 2) 改写router

```js
// 修改密码接口
router.patch('/modifyPassword', auth, (ctx, next) => {
    console.log(ctx.state.user)
    ctx.body = '修改密码成功'
})
```

# 15-代码测试自动化

1、登录接口成功之后添加脚本。获取token值放到环境变量里。

![image-20230812155336602](/Users/cuizhiwei/Library/Application Support/typora-user-images/image-20230812155336602.png)

2、在认证身份接口中，把token利用环境变量替换。达到自动设置目的。

![image-20230812155447818](/Users/cuizhiwei/Library/Application Support/typora-user-images/image-20230812155447818.png)

# 16-修改密码

1、密码不能为空，先要认证，新密码需要重新加密。

```js
router.patch('/modifyPassword', passwordValidator, auth, crpytPassword, modifyPassword)
```

2、获取数据，并数据库更新对应用户数据。

```js
async modifyPassword(ctx, next) {
        console.log(ctx.state.user)
        // 1. 获取数据
        const id = ctx.state.user.id
        const password = ctx.request.body.password
        // 2. 操作数据库
        try {
            const isSuccess = await updateById(id, { password })
            if (!isSuccess) {
                return ctx.emit('error', modifyPasswordError, ctx)
            } 

            ctx.body = {
                code: 0,
                message: "修改密码成功",
                result: {

                }
            }
        } catch (error) {
            console.error('修改密码失败', error);
            ctx.emit('error', modifyPasswordError, ctx)
        }
    }
```

```js
async updateById(id, { username, password, isAdmin }) {
        const whereOpt = { id }
        const newUser = {}
    
        username && Object.assign(newUser, { username })
        password && Object.assign(newUser, { password })
        isAdmin && Object.assign(newUser, { isAdmin })
    
        const res = await UserModel.update(newUser, { where: whereOpt })
        console.log('更新用户', res);
        return res[0] > 0 ? true : false
    }
```

# 17-路由自动加载

添加一个总路由入口，router文件下的其他路由加载到总路由上，通过脚本注入方式，避免每次新增路由都要修改。

1、新建router/index.js

```js
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
```

2、导入总路由

```js
const router = require("../router/index")
app.use(router.routes())
```

# 18-封装管理员权限

从token获取用户信息中，判断isAdmin是否为真。从而判断管理员权限。

```js
const hadAdminPermission = async (ctx, next) => {
    const { isAdmin } = ctx.state.user
    console.log("isAdmin=",isAdmin);
    if (!isAdmin) {
        console.error('error', "没有管理员权限");
        return ctx.emit('error', hasNotAdminPermission, ctx)
    }
    await next()
}
```

# 19-商品图片上传

方案：把文件传到upload文件夹下。

使用**multipart/form-data**形式二进制流形式上传数据。

需要配置静态路径和上传路径。

```js
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
```

2、根据文件名解析数据，获取上传路径并返回。

```js
class GoodsController {
    async upload(ctx, next) {
        const { file } = ctx.request.files
        console.log('file=', file.newFilename);
        console.log('path=', file.filepath);

        if (file) {
            ctx.body = {
                code: 0,
                message: '商品图片上传成功',
                result: {
                    goods_img: path.basename(file.filepath),
                },
            }
        } else {
            return ctx.app.emit('error', fileUploadError, ctx)
        }
    }
}
```

# 20-商品图片上传类型判断

```js
const fileTypes = ['image/jpeg', 'image/png']

if (file) {
    if (!fileTypes.includes(file.mimetype)) {
        return ctx.app.emit('error', unSupportedFileType, ctx)
    }
}
```

目前存在问题：即使验证错误，文件也已经上传。formidable参数配置，并把格式验证抽出来一个中间件。

# 21-统一参数格式校验

就是请求参数校验利用中间件校验。

`koa-parameter`

```js
async function goodsValidator(ctx, next) {
    try {
        ctx.verifyParams({
            name: { type: 'string', required: true },
            price: { type: 'number', required: true },
            num: { type: 'number', required: true },
            imageUrl: { type: 'string', required: true }
        });
    } catch (error) {
        console.error('校验商品参数失败', error);
        goodsFormatError.result = error
        ctx.app.emit('error', goodsFormatError, ctx)
        return
    }

    await next()
}

module.exports = {
    goodsValidator
}
```

