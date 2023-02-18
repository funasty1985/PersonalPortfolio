/*
File Name: "index.js"
Developer Name: "Fu Liang"
Student ID: 301323706
Date : 17 Feb, 2023
File Function: defining the business logics of index related path
*/

let express = require('express');
let router = express.Router();

// logic for dispalying home page
module.exports.displayHomePage = (req, res, next) => {
  res.render('index', { title: 'Home Page', }); 
}

module.exports.displayAtlHomePage = (req, res, next) => {
  let {email, message, name} = req.query;
  res.render('indexWithConfrimMessage', { 
    title: 'Home Page',
    name: name
  });
}

module.exports.displayAboutPage = (req, res, next) => {
  res.render('index', { title: 'About Me' }); 
}

module.exports.displayProjectPage = (req, res, next) => {
  res.render('index', { title: 'Projects' }); 
}

module.exports.displayServicePage = (req, res, next) => {
  res.render('index', { title: 'Services' }); 
}

module.exports.displayContactPage = (req, res, next) => {
  res.render('index', {title: 'Contact Page'}); 
}