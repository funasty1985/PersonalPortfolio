/*
File Name: "contact.js"
Developer Name: "Fu Liang"
Student ID: 301323706
Date : 17 Feb, 2023
File Function: defining the business contact related route
*/

let express = require("express");
let router = express.Router();
let contactController = require('../controllers/contact');

router.get('/', contactController.displayContactList);

router.get('/add', contactController.displayContactAddPage);

router.post('/add', contactController.processAddContact);

router.get('/edit/:id', contactController.displayEditContactPage);

router.post('/edit/:id', contactController.processEditContact);

router.get('/delete/:id', contactController.processDeleteContact)

module.exports = router;