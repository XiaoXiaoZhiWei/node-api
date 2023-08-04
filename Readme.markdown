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



















