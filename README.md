# webpack4.x_Course

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

plugin

webpack =》 ProvidePlugin DefinePlugin

html-webpack-plugin          自动将脚本资源在模板文件内引用
mini-css-extract-plugin      将样式抽离成独立文件并在模板文件内引用
webpack-bundle-analyzer      分析项目中占用大空间模块使用CDN引用减轻大小
copy-webpack-plugin          复制资源
webpack-merge                合并webpack配置
CleanWebpackPlugin           清除文件夹/文件

OptimizeCSSAssetsPlugin      压缩 CSS
UglifyJsPlugin               压缩 JavaScript
