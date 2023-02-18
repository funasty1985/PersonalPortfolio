/*
File Name: "contact.js"
Developer Name: "Fu Liang"
Student ID: 301323706
Date : 17 Feb, 2023
File Function: defining the business logic related to business contact view page 
*/

let express = require('express');
let Contact =require('../models/contact');

module.exports.displayContactList = (req, res, next) => {
    Contact.find((err, contactList) => {
        if (err) {
            return console.error(err);
        } else {
            // sort the contact list in alphabetical order
            contactList.sort();
            res.render('index', {title: 'Business Contacts', contactList})
        }
    })
}

module.exports.displayContactAddPage = (req, res, next) => {
    res.render('index', {title: 'Add Business Contact'})
}

module.exports.processAddContact = (req, res, next) => {
    let newContact = Contact({
        "contactName": req.body.name,
        "contactNumber": req.body.number,
        "email": req.body.email  
    })

    Contact.create(newContact, (err, contact) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/businessContact')
        }
    })
}

module.exports.displayEditContactPage = (req, res, next) => {
    let id = req.params.id;

    Contact.findById(id, (err, contact) => {
        if(err){
            console.log(err);
        }
        else {
            res.render('index', {title: "Edit Business Contact", contact})
        }
    });
}

module.exports.processEditContact = (req, res, next) => {
    let id = req.params.id;
    let updatedContact = Contact({
        "_id": id,
        "contactName": req.body.name,
        "contactNumber": req.body.number,
        "email": req.body.email
    })
    Contact.updateOne(
        {_id: id},
        updatedContact,
        (err, contact) => {
            if (err) {
                console.log(err);
            } else {
                res.redirect('/businessContact')
            }
        }
    )
}

module.exports.processDeleteContact = (req, res, next)=> {
    let id = req.params.id;

    Contact.remove({_id: id}, (err) => {
        if (err) {
            console.log(err);
            res.send(err);
        } else {
            res.redirect("/businessContact");
        }
    })
}