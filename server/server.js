'user strict';

const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const firebase = require('firebase');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();


// if we're developing, use webpack middleware for module hot reloading
if (process.env.NODE_ENV !== 'production') {
  console.log('==> 🌎 using webpack');

  // load and configure webpack
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const config = require('../webpack/dev.config');

  // setup middleware
  const compiler = webpack(config);
  app.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: config.output.publicPath }));
  app.use(webpackHotMiddleware(compiler));
}


app.use(morgan('dev'))
  .use(cookieParser())
  .use(bodyParser())
  .use(bodyParser.urlencoded({ extended: false}))
  .use(express.static(path.resolve(__dirname, '../client')))
  .use(express.static(path.resolve(__dirname, '../public')))
  .use('/', routes);
  
app.listen(PORT, () => {
  console.log('Express Server listening on port ' + PORT)
})