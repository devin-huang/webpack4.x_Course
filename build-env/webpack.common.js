const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// 将样式抽离成独立文件并在模板文件内引用
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 分析项目
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 复制资源
const CopyPlugin = require('copy-webpack-plugin')

// 环境合并配置
const developmentConfig = require('./webpack.dev')
const productionConfig = require('./webpack.prod')
const merge = require('webpack-merge')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

const generateConfig = env => {
  return {
    entry: {
      app: './src/index.js'
    },
    output: {
      filename: env === 'production' ? 'js/[name].[contenthash].js' : 'js/[name].js',
      path: resolve('dist')
    },
    devServer: {
      // hot: true
    },
    // 指定第三方框架/资源并进行高效解析
    resolve: {
      extensions: ['.js', '.vue', '.json'],
      alias: {
        'vue$': 'vue/dist/vue.js',
        '@': resolve('src')
      }
    },
    module: {
      rules: [
        // 与html-webpack-plugin不兼容, 使用时注意
        {
          test: /\.(htm|html)$/i,
          loader: 'html-loader',
          options: {
            attrs: [':data-src', 'img:src']
          }
        },
        {
          test: /\.scss$/,
          use: [
            'style-loader',
            'css-loader',
            'sass-loader'
          ]
        },
        {
          test: /\.css$/,
          loaders: [
            env === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
            'css-loader',
            'postcss-loader'
          ]
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/,
          loader: 'file-loader', // 一般使用file-loader, 限制大小时url-loader
          exclude: [resolve('node_modules')],
          options: {
            name: env === 'production' ? 'fonts/[name].[hash].[ext]' : 'fonts/[name].[ext]',
            publicPath: '/'
          }
        },
        {
          test: /\.(png|svg|jpg|gif)$/,
          loader: 'url-loader',
          exclude: [resolve('node_modules')],
          options: {
            name: env === 'production' ? 'images/[name].[hash].[ext]' : 'images/[name].[ext]',
            publicPath: '/',
            limit: '8192'
          }
        }
      ]
    },
    plugins: [
      new CopyPlugin([
        {
          from: resolve('src/assets'),
          to: resolve('dist') + '/assets/[name].[ext]',
          ignore: ['fonts/*.*', '*.js', '*.css', '*.png', '*.gif', '*.jpg']
        }
      ]),
      // new BundleAnalyzerPlugin({
      //   analyzerMode: 'server',
      //   analyzerHost: '127.0.0.1',
      //   analyzerPort: 8889,
      //   reportFilename: 'report.html'
      // }),
      // new webpack.HotModuleReplacementPlugin(),
      // new webpack.NamedModulesPlugin(),
      new webpack.ProvidePlugin({
        _: 'lodash',
        $: 'jquery',
        jQuery: 'jquery'
      }),
      new HtmlWebpackPlugin({
        title: 'Devin webpack Demo',
        filename: 'index.html',
        template: 'src/index.html',
        inject: true,
        minify: {
          collapseWhitespace: true, // 合并空白字符
          removeComments: true, // 移除注释
          removeAttributeQuotes: true // 移除属性上的引号
        }
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: '[name].[hash].css',
        chunkFilename: 'css/[name].[hash].css'
      })
    ]
  }
}

module.exports = env => {
  console.log('=======================ENV================', env)
  let config = env === 'production' ? productionConfig : developmentConfig
  return merge(generateConfig(env), config)
};