var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser');
var expressHBS = require('express-handlebars');
var mongoose = require('mongoose');
var passport = require('passport');
var session = require('express-session');
var flash = require('connect-flash');
var validator = require('express-validator');
var MongoStore = require('connect-mongo')(session);
var nodemailer = require('nodemailer');

var indexRouter = require('./routes/index');
var userRoute = require('./routes/user');
var adminRoute = require('./routes/admin');

var app = express();
mongoose.connect('mongodb://localhost:27017/OCM', 
{
  useNewUrlParser: true,
  useUnifiedTopology: true ,
  useCreateIndex : true ,
  useFindAndModify: false},
  (err)=>{
   if(!err) {
     console.log('Connected')
    }
    else { 
      console.log('Error: '+err)
    }
});
require('./config/passport');
// view engine setup
app.engine('.hbs',expressHBS({defaultLayout : 'layout' , extname : '.hbs'}));
app.set('view engine', '.hbs');

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(validator());
app.use(cookieParser());
app.use(session({
  secret: 'mysupersecret',
  resave: false,
  saveUninitialized: false,
  store: new MongoStore({ mongooseConnection: mongoose.connection }),
  cookie: { maxAge: 180 * 60 * 1000}
}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(path.join(__dirname, 'public')));

app.use(function(req, res, next){
  res.locals.login = req.isAuthenticated();
  res.locals.session = req.session;
  next();
});

app.use(function(req, res, next) {
  if (req.user) {
      res.locals.currentUser = req.user;   
  }
  next();
});

app.use('/admin', adminRoute);
// app.use(app.adminRoute);
// routes.initialize(app);
app.use('/user', userRoute);
app.use('/', indexRouter);

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