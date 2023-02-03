/*
File Name: "app.js"
Developer Name: "Fu Liang"
Student ID: 301323706
Date : 3 Feb, 2023
File Function: initiating and configuring an app object 
*/

// import external modules 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // parsing retrieved  cookies sent by the user-agent
var logger = require('morgan'); // http request logger middleware

// import routes
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

// create an app obejct
var app = express();

// view engine setup (setting app environment variables)
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// mounting middlewares into the app object
app.use(logger('dev'));
app.use(express.json()); // parses incoming requests with JSON payloads and puts the parsed data in req.body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 
app.use(express.static(path.join(__dirname, 'public'))); // exposes the 'pulbic' folder to a particular URL so it's contents can be publicly accessed.
app.use(express.static(path.join(__dirname, 'node_modules'))); // exposes the 'node_modules' folder

// mounting routers to the app object ( directing HTTP requests to different routers according the requests' request urls )
app.use('/', indexRouter);
app.use('/users', usersRouter);

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
