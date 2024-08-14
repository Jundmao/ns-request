// https://www.maizhiying.me/posts/2017/03/01/webpack-babel-ie8-support.html
const path = require('path')
const moment = require('moment')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const WebpackCleanupPlugin = require('webpack-cleanup-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './lib/index.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'main.js',
    chunkFilename: '[name].[hash].js',
    library: 'someLibName',
    libraryTarget: 'umd'
  },
  externals : {
    react: 'react',
    'react-dom': 'react-dom'
  },
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            ascii_only: true
          },
          compress: {
            drop_console: true
          }
        }
      }),
      new webpack.BannerPlugin(`${moment().format('YYYY-MM-DD HH:mm:ss')}`)
    ]
  },
  resolve: {
    modules: ['node_modules', 'src']
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }]
  },
  plugins: [
    new WebpackCleanupPlugin(),
    new webpack.DefinePlugin({}),
    new webpack.ProvidePlugin({
      'react': 'React'
    }),
    new HtmlWebpackPlugin({
      template: 'template/index.html',
      hash: true
    })
  ]
}
