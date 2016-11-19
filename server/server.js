const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const routes = require('./routes');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(morgan('dev'))
  .use(cookieParser())
  .use(bodyParser())
  .use(bodyParser.urlencoded({ extended: false}))
  .use(express.static(path.resolve(__dirname, '../public')))
  .use('/', routes);
  
app.listen(PORT, () => {
  console.log('Express Server listening on port ' + PORT)
})