const path = require('path')
const webpack = require('webpack')
// prod环境变量配置
const env = require('../config/prod.env')

// 压缩 CSS
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩 JavaScript
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  devtool: 'source-map',
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({}),
      new UglifyJsPlugin({
        test: /\.js(\?.*)?$/i,
        include: path.resolve(__dirname, 'dist'),
        exclude: /\/node_modules/,
        sourceMap: true
      })
    ],
    runtimeChunk: 'single',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    })
  ]
}
