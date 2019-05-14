const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const productHelpers = require('./helpers/productHelper');
const database = require('./database/index');
const Product = require('./models/product');
const Category = require('./models/category');
const app = express();
const configDB = require('./config/mongodb');

app.engine('hbs', exphbs({
  defaultLayout: 'main',
  layoutsDir: 'views/layouts',
  helpers: {
    getStar: productHelpers.showStar
  }
}));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

const productRouter = require('./routes/product');
app.use('/product', productRouter);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const homeRouter = require('./routes/index');
app.use('/', homeRouter);

database.connect().then((clientDB)=>{
  console.log('Connect database success');
  app.db = clientDB.db(configDB.databaseName);
  app.productModel = new Product(app.db);
  app.categoryModel = new Category(app.db);

  console.log("Affter connect", app.productModel);
}).catch((err)=>{
  console.log('Connect database err: ' + err);
  throw(err);
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
