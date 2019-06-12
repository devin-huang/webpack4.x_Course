const path = require('path')
const webpack = require('webpack')
const merge = require('webpack-merge')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const common = require('./webpack.common')
const env = require('../config/prod.env')
// 压缩 CSS
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
// 压缩 JavaScript
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

module.exports = merge(common, {
  mode: 'production',
  output: {
    publicPath: env.API_ROOT.replace(/"|'/gi, '')
  },
  devtool: 'source-map',
  optimization: {
    minimizer: [
      // CSS压缩
      new OptimizeCSSAssetsPlugin({
        cssProcessorOptions: {
          discardComments: {
            removeAll: true // 移除注释
          }
        }
      }),
      // JS压缩
      new UglifyJsPlugin({
        uglifyOptions: {
          // clear console
          warnings: false,
          drop_console: true,
          pure_funcs: ['console.log']
        },
        test: /\.js(\?.*)?$/i,
        exclude: /\/node_modules/,
        parallel: true, // 开启并行压缩，充分利用cpu
        extractComments: false, // 移除注释
        sourceMap: true
      })
    ],
    runtimeChunk: 'single',
    // 第三方库/框架独立成vendors.chunk文件
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: resolve('node_modules'),
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': env
    }),
    new CleanWebpackPlugin({
      root: resolve('../'),
      verbose: true
    })
  ]
})