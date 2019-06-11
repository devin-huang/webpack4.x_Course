const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const env = require('../config/dev.env')
const API = env.API_ROOT.replace(/"|'/gi, '').split(':')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    // proxy: {
    //   host: 'localhost', // can be overwritten by process.env.HOST
    //   port: 9099, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    //   errorOverlay: true,
    //   notifyOnErrors: false,
    //   poll: false,
    // },
    port: API[1] || 8080,
    host: API[0] || 'localhost',
    publicPath: '', // 此路径下的打包文件可在浏览器中访问
    contentBase: resolve('dist') // 文件存储在内存中没有保存dist中，所以CleanWebpackPlugin后dist为空
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    })
  ]
})
