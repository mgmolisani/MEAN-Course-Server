const mongoose = require('mongoose');

const enrollmentSchema = mongoose.Schema({
    section: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'SectionModel'
    },
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    }
}, {collection: 'enrollments'});

module.exports = enrollmentSchema;