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
      { test: /\.js?$/,
        loader: 'babel',
        exclude: /node_modules/ },
      { test: /\.scss?$/,
        loader: 'style!css!sass',
        include: path.join(__dirname, 'src', 'styles') },
      { test: /\.png$/,
        loader: 'file' },
      { test: /\.css$/,
        loader: 'style-loader!css-loader', },
      { test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        loader: 'file'}
    ]
  }
}








// const path = require('path');
// const webpack = require('webpack');

// module.exports = {
//   devtool: 'cheap-module-eval-source-map',
//   entry: [
//     'webpack-hot-middleware/client',
//     'babel-polyfill',
//     path.join(__dirname, './client/src/index'),
//   ],
//   output: {
//     path: path.join(__dirname, './public/'),
//     filename: 'bundle.js',
//     publicPath: '/',
//   },
//   module: {
//     loaders: [
//       { test: /\.svg$/, loaders: ['raw-loader']},
//       // take all less files, compile them, and bundle them in with our js bundle
//       { test: /\.less$/, loader: 'style!css!autoprefixer?browsers=last 2 version!less' },
//       {
//         test: /\.js$/,
//         exclude: /node_modules/,
//         loader: 'babel-loader',
//         query: {
//           presets: ['es2015', 'react'],
//           plugins: [['react-transform', {
//             transforms: [{
//               transform: 'react-transform-hmr',
//               imports: ['react'],
//               // this is important for Webpack HMR:
//               locals: ['module']
//             }],
//           }]],
//         },
//       },
//     ],
//   },
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env': {
//         NODE_ENV: JSON.stringify('development'),
//       },
//     }),
//     new webpack.optimize.OccurenceOrderPlugin(),
//     new webpack.HotModuleReplacementPlugin(),
//     new webpack.NoErrorsPlugin(),
//   ],
// };