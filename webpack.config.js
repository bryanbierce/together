const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')

const sassLoaders = [
  'css-loader',
  'postcss-loader',
  'sass-loader?indentedSyntax=sass&includePaths[]=' + path.resolve(__dirname, './client')
]

const client = path.join(__dirname, 'client/app.jsx');
const server = path.join(__dirname, 'server/server.js');

module.exports = {
  devtool: 'source-map',
  context: __dirname,
  entry: './client/AppEntry.jsx',
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.json', '.sass']
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
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader', sassLoaders.join('!'))
      },
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      }
    ],
    plugins: [
      new ExtractTextPlugin('public/style.css', {
        allChunks: true
      })
    ]
  }
}
