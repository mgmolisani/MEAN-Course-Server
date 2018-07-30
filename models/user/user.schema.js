const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: String,
    password: String,
    firstName: String,
    lastName: String,
    phone: String,
    email: String,
    dateOfBirth: Date,
    role: String,
}, {collection: 'users'});

module.exports = userSchema;