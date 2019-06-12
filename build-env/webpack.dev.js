const path = require('path')
const webpack = require('webpack')
// dev环境变量配置
const env = require('../config/dev.env')

module.exports = {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: path.join(__dirname, 'dist') // 文件存储在内存中没有保存dist中，所以CleanWebpackPlugin后dist为空
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    })
  ]
}
