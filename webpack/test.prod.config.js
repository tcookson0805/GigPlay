var path = require('path');

module.exports = {
  entry: {
    app: path.join(__dirname, '../client/src/index'),
  },
  output: {
    path: path.join(__dirname, '../public/'),
    filename: 'bundle.js'
  },
  modules: [
    {
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: /node_modules/
    }
  ],
  devServer: {
    
  }  
}