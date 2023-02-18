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

// middleware helper function for guard purpose
function requireAuth(req, res, next)
{
    // check if the user is logged in
    if (!req.isAuthenticated()){
        return res.redirect('/login');
    } 
    next();
}

router.get('/', requireAuth, contactController.displayContactList);

router.get('/add', requireAuth, contactController.displayContactAddPage);

router.post('/add', requireAuth, contactController.processAddContact);

router.get('/edit/:id', requireAuth, contactController.displayEditContactPage);

router.post('/edit/:id', requireAuth, contactController.processEditContact);

router.get('/delete/:id', requireAuth, contactController.processDeleteContact)

module.exports = router;