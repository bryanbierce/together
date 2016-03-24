const path = require('path')

const client = path.join(__dirname, 'client/app.jsx');
const server = path.join(__dirname, 'server/server.js');

module.exports = {
  context: __dirname,
  entry: {
    "public/bundle": './client/AppEntry.jsx',
    "server/bundle": './server/server.js'
  },
  output: {
    path: path.join(__dirname, '/'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json']
  },
  stats: {
    colors: true,
    reasons: true,
    chunks: false
  },
  module: {
    // preLoaders: [
    //   {
    //     test: /\.jsx?$/,
    //     loader: "eslint-loader",
    //     exclude: /node_modules/
    //   }
    // ],
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ]
  }
}
