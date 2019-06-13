const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const exphbs = require('express-handlebars');
const productHelpers = require('./helpers/productHelper');
const app = express();
const passport = require('passport');
const authen = require('./authen');
const flash = require('connect-flash');

var bodyParser = require('body-parser');

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
// body parser
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

//express-session
const expressSession = require('express-session');
app.use(expressSession({
  secret: 'keyboeard cat',
  cookie: { maxAge: 60000 },
  saveUninitialized: true,
  resave: true
}));
//-------------------------------------------------
app.use(logger('dev'));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Passport init, setup
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

passport.serializeUser(authen.serializeUser);
passport.deserializeUser(authen.deserializeUser);
passport.use('login', authen.loginStrategy);
passport.use('signup', authen.signupStrategy);

const productRouter = require('./routes/product');
app.use('/product', productRouter);

const usersRouter = require('./routes/users');
app.use('/users', usersRouter);

const homeRouter = require('./routes/index');
app.use('/', homeRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
