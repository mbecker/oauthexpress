'use strict';
const express		= require('express');
const path 			= require('path');
const fs 			= require('fs');
const favicon 		= require('serve-favicon');
const logger 		= require('morgan');
const cookieParser 	= require('cookie-parser');
const bodyParser 	= require('body-parser');

const index = require('./routes/index');
const users = require('./routes/users');

const app = express();
// create a write stream (in append mode)
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), {flags: 'a'})

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev', {stream: accessLogStream}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
app.use('/users', users);

app.all('/clientregistration', function (req, res, next) {
  console.log("--- clientregistration ---");
  console.log(req.headers);
  console.log(req.body);
  next() // pass control to the next handler
});

app.all('/authorization', function (req, res, next) {
  console.log("--- authorization ---");
  console.log(req.headers);
  console.log(req.body);
  next() // pass control to the next handler
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
