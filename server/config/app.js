/*
File Name: "app.js"
Developer Name: "Fu Liang"
Student ID: 301323706
Date : 17 Feb, 2023
File Function: initiating and configuring an app object 
*/

// import external modules 
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser'); // parsing retrieved  cookies sent by the user-agent
var logger = require('morgan'); // http request logger middleware
let cors = require('cors');

// import routes
let indexRouter = require('../routes/index');
let usersRouter = require('../routes/users');
let contactRouter = require('../routes/contact');

// modules for authenication
let session = require("express-session");
let passport = require("passport");

let passportLoad = require("passport-local");
let localStrategy = passportLoad.Strategy;
let flash = require("connect-flash");

//>  database setup
let mongoose = require("mongoose");
let DB = require("./db")

//> point mongoose to the DB URI
mongoose.set('strictQuery', true);
mongoose.connect(DB.URI, {useNewUrlParser: true});

//> setting mongoose event listener
let mongoDB = mongoose.connection;
mongoDB.on("error", console.error.bind(console, "Connection Error:"));
mongoDB.once('open', () => {
  console.log("Connected to MongoDB......")
})

// create an app obejct
var app = express();

// view engine setup (setting app environment variables)
app.set('views', path.join(__dirname, '../views'));
app.set('view engine', 'ejs');

// mounting middlewares into the app object
app.use(logger('dev'));
app.use(express.json()); // parses incoming requests with JSON payloads and puts the parsed data in req.body
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser()); 

app.use(express.static(path.join(__dirname, '../../public'))); // exposes the 'pulbic' folder to a particular URL so it's contents can be publicly accessed.
app.use(express.static(path.join(__dirname, '../../node_modules'))); // exposes the 'node_modules' folder

// setup express session
app.use(session({
  secret: "SomeSecret",
  saveUninitialized: false,
  resave: false
}))

// initialize flash
app.use(flash());

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// create a User Model Instance
let userModel = require("../models/user");
let User = userModel.User;

// serialize and deserialize the User info
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// implement a User Authentication Strategy
passport.use(User.createStrategy());

// mounting routers to the app object ( directing HTTP requests to different routers according the requests' request urls )
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/businessContact', contactRouter);

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
