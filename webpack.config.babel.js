var webpack = require('webpack');
var path = require('path');


module.exports = {
  devtool: 'eval',
  entry: {
    'public/bundle': './client/app.jsx',
    'server/bundle': './server/server.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
  },
  output: {
    path: path.join(__dirname, '/'),
    publicPath: '/',
    filename: '[name].js',
  },
  devServer: {
    contentBase: './public/client',
  },
}
