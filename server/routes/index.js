/*
File Name: index.js
Developer Name: Fu Liang
Student ID: 301323706
Date : 17 Feb, 2023
File Function: handling url path under the index route
*/

var express = require('express');
var router = express.Router();

// import controller
let indexController = require('../controllers/index')

/* GET home page. */
router.get('/', indexController.displayHomePage)

/* GET home page atlernative. */
router.get('/home', indexController.displayAtlHomePage)

/* GET about page. */
router.get('/about', indexController.displayAboutPage);

/* GET progject page. */
router.get('/projects', indexController.displayProjectPage);

/* GET service page. */
router.get('/services', indexController.displayServicePage);

/* GET contact page. */
router.get('/contact', indexController.displayContactPage);

module.exports = router;
