/*
File Name: "user.js"
Developer Name: "Fu Liang"
Student ID: 301323706
Date : 17 Feb, 2023
File Function: defining the user model 
*/

let mongoose = require('mongoose');
let passportLocalMongoose = require('passport-local-mongoose');

// create a user model class
let User = mongoose.Schema
(
    {
        username:
        {
            type: String,
            default: "",
            trim: true,
            require: "username is required"
        },
        email:
        {
            type: String,
            default: '',
            trim: true,
            required: 'email address is required'   
        },
        displayName:
        {
            type: String,
            default: '',
            trim: true,
            required: 'display name is require'
        },
        created:
        {
            type: Date,
            default: Date.now
        },
        updated:
        {
            type:Date,
            default: Date.now
        }
    },
    {
        collection: "users"
    }
)

// configure options for User Model
let options = ({missingPasswordError: "Wrong/ Missing Password"});

User.plugin(passportLocalMongoose, options);

module.exports.User = mongoose.model('User', User);