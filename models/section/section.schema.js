const mongoose = require('mongoose');

const sectionSchema = mongoose.Schema({
    name: String,
    seats: Number,
    courseId: Number
}, {collection: 'sections'});

module.exports = sectionSchema;