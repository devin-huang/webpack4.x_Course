/**
 * 优化策略
 * 1.dllPlugin --- 打包项目时将第三方框架/插件抽离直接再dist/html引用
 * 2.happypack --- 多线程打包
 **/
const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 将样式抽离成独立文件并在模板文件内引用
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 分析项目
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// 复制资源
const CopyPlugin = require('copy-webpack-plugin')

function resolve (dir) {
  return path.join(__dirname, '..', dir)
}

console.log(process.env.NODE_ENV, '====================')

module.exports = {
  entry: './src/index.js',
  output: {
    filename: process.env.NODE_ENV === 'production' ? 'js/[name].[contenthash].js' : 'js/[name].js',
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
  // CDN引用第三方依赖， 需要把ProvidePlugin对应lodash删除,并在index.html中直接引用CDN
  // externals: {
  //   lodash: 'Lodash'
  // },
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
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.css$/,
        loaders: [
          process.env.NODE_ENV === 'production' ? MiniCssExtractPlugin.loader : 'style-loader',
          'css-loader',
          'postcss-loader'
        ]
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        loader: 'file-loader', // 一般使用file-loader, 限制大小时url-loader
        exclude: [resolve('node_modules')],
        options: {
          name: process.env.NODE_ENV === 'production' ? 'fonts/[name].[hash].[ext]' : 'fonts/[name].[ext]',
          publicPath: '/'
        }
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        loader: 'url-loader',
        exclude: [resolve('node_modules')],
        options: {
          name: process.env.NODE_ENV === 'production' ? 'images/[name].[hash].[ext]' : 'images/[name].[ext]',
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
      inject: 'body', // 插入到body最后
      minify: {
        collapseWhitespace: true, // 合并空白字符
        removeComments: true, // 移除注释
        removeAttributeQuotes: true // 移除属性上的引号
      }
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css',
      chunkFilename: 'css/[name].[hash].css'
    })
  ]
}
