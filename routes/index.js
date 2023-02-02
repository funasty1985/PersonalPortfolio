var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Home Page', }); }
)
/* GET home page atlernative. */
router.get('/home', function(req, res, next) {
  let {email, message, name} = req.query;
  res.render('indexWithConfrimMessage', { 
    title: 'Home Page',
    name: name
  });
})

/* GET home page. */
router.get('/about', function(req, res, next) {
  res.render('index', { title: 'About Me' });
});

/* GET home page. */
router.get('/projects', function(req, res, next) {
  res.render('index', { title: 'Projects' });
});

/* GET home page. */
router.get('/services', function(req, res, next) {
  res.render('index', { title: 'Services' });
});

/* GET home page. */
router.get('/contact', function(req, res, next) {
  res.render('index', { title: 'Contact Page' });
});

module.exports = router;
