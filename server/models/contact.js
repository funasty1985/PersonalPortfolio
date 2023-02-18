/*
File Name: "contact.js"
Developer Name: "Fu Liang"
Student ID: 301323706
Date : 17 Feb, 2023
File Function: defining the contact model 
*/

let mongoose = require("mongoose");

// create a contact model class
let ContactModal = mongoose.Schema({
    contactName: 
    {
        type: String,
        default: '',
        trim: true,
        required: 'contact name is required'
    },
    contactNumber: 
    {
        type: String,
        default: '',
        trim: true,
        required: 'contact number is required'
    },
    email: 
    {
        type: String,
        default: '',
        trim: true,
        required: 'email address is required'   
    },
},
{
    collection: "contacts"
});

module.exports = mongoose.model('Contact', ContactModal)