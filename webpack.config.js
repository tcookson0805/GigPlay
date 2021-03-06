const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'source-map',

  entry: [
    './client/src/index'
  ],

  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/public/'
  },

  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      minimize: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    })
  ],

  module: {
    loaders: [
      { test: /\.svg$/, loaders: ['raw-loader']},
      { test: /\.js?$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.png$/, loader: 'file' },
      { test: /\.css$/, loader: 'style-loader!css-loader', },
      { test: /\.(ttf|eot|woff(2)?)(\?[a-z0-9]+)?$/, loader: 'file'}
    ]
  }
}


