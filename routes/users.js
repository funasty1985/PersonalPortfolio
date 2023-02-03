/*
File Name: user.js
Developer Name: Fu Liang
Student ID: 301323706
Date : 3 Feb, 2023
File Function: handling routes under the userRouter
*/

var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

module.exports = router;
