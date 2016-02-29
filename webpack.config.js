var webpack = require('webpack');
var path = require('path');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:5267',
    'webpack/hot/only-dev-server',
    './client/Entry.js',
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'react-hot!babel',
        include: path.join(__dirname, 'client')
      }
    ]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  output: {
    path: path.join(__dirname, '/public/client/'),
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './public/client',
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ]
};
