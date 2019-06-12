# WebPack

本质上，webpack 是一个现代 JavaScript 应用程序的静态模块打包工具。当 webpack 处理应用程序时，它会在内部构建一个 依赖图(dependency graph)，此依赖图会映射项目所需的每个模块，并生成一个或多个 bundle。

# WebPack与Grunt、Gulp相比特性

Webpack和Gulp/Grunt并没有太多的可比性，Gulp/Grunt是一种能够优化前端的开发流程的工具，而WebPack是一种模块化的解决方案，不过Webpack的优点使得Webpack在很多场景下可以替代Gulp/Grunt类的工具。

* Entry：入口，Webpack 执行构建的第一步将从 Entry 开始，可抽象成输入。
* Module：模块，在 Webpack 里一切皆模块，一个模块对应着一个文件。Webpack 会从配置的 Entry 开始递归找出所有依赖的模块。
* Chunk：代码块，一个 Chunk 由多个模块组合而成，用于代码合并与分割。
* Loader：模块转换器，用于把模块原内容按照需求转换成新内容。
* Plugin：扩展插件，在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情。
* Output：输出结果，在 Webpack 经过一系列处理并得出最终想要的代码后输出结果。

https://webpack.docschina.org/guides/


```
webpack4.x_Course
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

-global
--save
-dev

webpack/webpack-cli/webpack-dev-server

cross-env

dev / build

```
webpack not installed, consider installing it using  开发依赖安装不齐全导致
```

module.exports = {
  devtool
  optimization: {
    splitChunks
  }
  resolve: {
    extensions
    alias
  },
  externals
}

plugin
```
webpack.ProvidePlugin        按需载入第三方框架/库
webpack.DefinePlugin         根据环境变量定义自定义变量（仅JavaScript调用，非node.js调用）
html-webpack-plugin          自动将脚本资源在模板文件内引用
mini-css-extract-plugin      将样式抽离成独立文件并在模板文件内引用
webpack-bundle-analyzer      分析项目中占用大空间模块使用CDN引用减轻大小
copy-webpack-plugin          复制资源
webpack-merge                合并webpack配置
CleanWebpackPlugin           清除文件夹/文件

OptimizeCSSAssetsPlugin      压缩 CSS
UglifyJsPlugin               压缩 JavaScript

优化策略
1.dllPlugin --- 打包项目时将第三方框架/插件抽离直接再dist/html引用
2.happypack --- 多线程打包
```
