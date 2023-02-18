/*
File Name: "index.js"
Developer Name: "Fu Liang"
Student ID: 301323706
Date : 17 Feb, 2023
File Function: defining the business logics of index related path
*/

let express = require('express');
let router = express.Router();
let passport = require('passport');

// create the User Nodel instance 
let userModel = require('../models/user');
let User = userModel.User; 

// logic for dispalying home page
module.exports.displayHomePage = (req, res, next) => {
  res.render('index', { title: 'Home Page', displayName: req.user ? req.user.displayName: ""}); 
}

module.exports.displayAtlHomePage = (req, res, next) => {
  let {email, message, name} = req.query;
  res.render('indexWithConfrimMessage', { 
    title: 'Home Page',
    name: name,
    displayName: req.user ? req.user.displayName: ""
  });
}

module.exports.displayAboutPage = (req, res, next) => {
  res.render('index', { title: 'About Me' ,displayName: req.user ? req.user.displayName: ""}); 
}

module.exports.displayProjectPage = (req, res, next) => {
  res.render('index', { title: 'Projects' ,displayName: req.user ? req.user.displayName: ""}); 
}

module.exports.displayServicePage = (req, res, next) => {
  res.render('index', { title: 'Services' ,displayName: req.user ? req.user.displayName: ""}); 
}

module.exports.displayContactPage = (req, res, next) => {
  res.render('index', {title: 'Contact Page', displayName: req.user ? req.user.displayName: ""}); 
}

module.exports.displayLoginPage = (req, res, next) => {
  // chec if the user is already logged in 
  if(!req.user){
    // go to login view
    res.render('index', {
      title: "Login",
      messages: req.flash("loginMessage"),
      displayName: req.user ? req.user.displayName: ""
    })
  } else {
    return res.redirect("/");
  }
}

module.exports.processLoginPage = (req, res, next) => {
  passport.authenticate('local', 
  (err, user, info) => {
    // server error checking
    if(err)
    {
      return next(err);
    }
    // user login error checking
    if(!user){
      req.flash('loginMessage', 'Authentication Error');
      return res.redirect('/login');
    }

    req.login(user, (err)=> {
      if(err){
        return next(err);
      }

      return res.redirect('/businessContact');
    })
  })(req, res, next);
}

module.exports.displayRegisterPage = (req, res, next) => {
  // check if the user is not already loggin in 
  if (!req.user) {
    res.render('index',{
      title: "Register",
      messages: req.flash('registerMessage'),
      displayName: req.user ? req.user.displayName: ""
    })
  } else {
    return res.redirect('/');
  }
}

module.exports.processRegisterPage = (req, res, next) => {
  // instantiate a user object
  let newUser = new User({
    username: req.body.username,
    email: req.body.email,
    displayName: req.body.displayName
  });

  User.register(newUser, req.body.password, (err) => {
    if (err)
    {
      console.log(err);
      if(err.name == "UserExistsError")
      {
        req.flash(
          'registerMessage',
          'Registeration Error: User Already Exists'
        )
        return res.render("index", {
          title: 'Register',
          messages: req.flash('registerMessage'),
          displayname: req.user ? req.user.displayName: ''
        })
      }
    }
      return passport.authenticate('local')(req, res, () => {
        console.log("here");
        res.redirect('/businessContact');
      });
  })
}

module.exports.performLogout = (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect('/');
  })
}
