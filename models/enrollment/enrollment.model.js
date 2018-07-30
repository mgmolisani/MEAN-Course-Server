const mongoose = require('mongoose');
const enrollmentSchema = require('./enrollment.schema');
const enrollmentModel = mongoose.model('EnrollmentModel', enrollmentSchema);

function createEnrollment(enrollment) {
    return enrollmentModel.create(enrollment);
}

function deleteEnrollment(enrollment) {
    return enrollmentModel.findOneAndRemove(enrollment);
}

function findSectionsForStudent(studentId) {
    return enrollmentModel
        .find({student: studentId})
        .populate('section')
        .then(function(enrollments) {
            return enrollments.reduce(function(sections, enrollment) {
                sections.push(enrollment.section);
                return sections;
            }, [])
        });
}

module.exports = {
    createEnrollment: createEnrollment,
    deleteEnrollment: deleteEnrollment,
    findSectionsForStudent: findSectionsForStudent
};
