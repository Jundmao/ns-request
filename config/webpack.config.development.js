const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: './index.js',
  output: {
    path: path.join(__dirname, '../dist'),
    filename: 'main.js'
  },
  devtool: 'cheap-module-eval-source-map',
  resolve: {
    modules: ['node_modules', 'lib']
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader', 'eslint-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'template/index.html'
    }),
    new webpack.ProvidePlugin({
      'react': 'React'
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({})
  ],
  devServer: {
    contentBase: [
      path.join(__dirname, '../dist'),
      path.join(__dirname, '..')
    ],
    hot: true,
    host: '0.0.0.0',
    disableHostCheck: true
  }
}
