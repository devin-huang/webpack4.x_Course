## WebPack

> 本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个 依赖图(dependency graph)，此依赖图会映射项目所需的每个模块，并生成一个或多个 bundle。


## WebPack与Grunt、Gulp相比特性

> Webpack和Gulp/Grunt并没有太多的可比性，Gulp/Grunt是一种能够优化前端的开发流程的工具，而WebPack是一种模块化的解决方案，不过Webpack的优点使得Webpack在很多场景下可以替代Gulp/Grunt类的工具。


## npm install

```
npm install
1.安装到项目 node_modules; 
2.不会将依赖写入 devDependencies 或 dependencies;
3.npm install 初始化项目时不会下载

npm install -g
1.不安装到项目 node_modules;
2.不会将依赖写入 devDependencies或dependencies;
3. npm install 初始化项目时不会下载

npm install -save
1.安装到项目 node_modules;
2.将依赖写入 dependencies;
3.npm install 初始化项目时下载; 
4. npm install --production 或注明NODE_ENV变量值为 production 时，自动下载依赖到 node_modules 目录

npm install --save-dev
1.安装依赖到项目 node_modules;
2. 将依赖写入 devDependencies;
3.npm install 初始化项目时下载依赖;
4. npm install --production或注明NODE_ENV变量值为 production 时，不会自动下载依赖到 node_modules 目录


**生产环境，使用npm install --production 安装 dependencies 部分的模块**
**开发环境，npm install ，安装所有 devDependencies 和 dependencies 里面的模块**
```


## 初始化项目结构

> 入门配置参考： [https://webpack.docschina.org/guides/](https://webpack.docschina.org/guides/)

> 这里配置Webpack 必须要安装三个依赖`webpack` `webpack-cli` `webpack-dev-server`

> 具体实现可参考源码


### 项目目录结构

```
|- build                   webpack模块化打包配置
|- config                  环境变量得配置
|- /src                    目标打包路径
  |- assets                静态资源
  |- style                 样式资源
  |- index.js              主文件入口
  |- index.html            模板文件
|- eslintrc.js             eslint规范配置
|- .gitgnore               Git配置
|- package.json            项目依赖    
|- postcss.config.js       项目兼容浏览器版本配置
```

* Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
* Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。
* Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
* Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
* Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
* Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。

### devtool 映射 （当JS发现错误时准确定位到源文件位置） [devtool配置](https://webpack.docschina.org/configuration/devtool/#src/components/Sidebar/Sidebar.jsx)

```
开发环境：cheap-module-eval-source-map
生产环境：source-map
```

### optimization 优化

```js
minimizer： CSS/JS压缩

runtimeChunk/splitChunks： JavaScript代码抽离

app                    开发编写的代码
runtime                将包含chunks 映射关系的 list单独从 app.js里提取出来
vendors                第三方依赖框架/库

```
### resolve 解析

```
extensions                根据配置内容可以省略引用文件的后缀名，依顺序搜索
alias                     指定名称来替代（第三方框架/路径等）
```

### externals 扩展

```
CDN引用第三方依赖， 需要把ProvidePlugin对应lodash删除,并在index.html中直接引用CDN
```

### plugin
```
webpack.ProvidePlugin                按需载入第三方框架/库
webpack.DefinePlugin                 根据环境变量定义自定义变量（仅JavaScript调用，非node.js调用）
html-webpack-plugin                  自动将脚本资源在模板文件内引用
mini-css-extract-plugin              将样式抽离成独立文件并在模板文件内引用
webpack-bundle-analyzer              分析项目中占用大空间模块使用CDN引用减轻大小
copy-webpack-plugin                  复制资源
webpack-merge                        合并webpack配置
CleanWebpackPlugin                   清除文件夹/文件
OptimizeCSSAssetsPlugin              压缩 CSS
UglifyJsPlugin                       压缩 JavaScript

```
> 优化策略

> 1.dllPlugin 打包项目时将第三方框架/插件抽离直接再dist/html引用

> 2.happypack 多线程打包


## 环境变量

### 根据环境变量模块化打包

package.json

> 运行跨平台设置和使用环境变量  `npm install --save-dev cross-env`

```json
// 使用cross-env切换环境变量
"dev": "cross-env NODE_ENV=development  webpack-dev-server --config build/webpack.dev.js --open --progress",
"build": "cross-env NODE_ENV=production webpack --config build/webpack.prod.js",

// 使用node内置方式切换环境变量
"dev:env": "webpack-dev-server --env development --open --config build-env/webpack.common.js",
"build:env": "webpack --env production --config build-env/webpack.common.js"
```


### 根据环境变量配置路径

> 实际开发中需要对不同环境的API/图片/登录等进行配置，所以需要项目目录结构：`config`存放不同环境变量的资源路径配置， 再用环境变量模块化打包时指定引用资源路径配置，保存到 `webpack.DefinePlugin` 从而前端能获取资源路径


config/prod.env.js
```bash
module.exports = {
  'API_ROOT': JSON.stringify('http://localhost:8080'),
  'LOGIN_URL': JSON.stringify('http://localhost:8080.prod/login'),
  'IMAGE_URL': JSON.stringify('http://localhost:8080.prod/image')
}
```


webpack.prod.js  
```js
const env = require('../config/prod.env')

plugins: [
  new webpack.DefinePlugin({
    'process.env': env
  })
]
```
