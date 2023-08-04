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



