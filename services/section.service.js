const sectionModel = require('../models/section/section.model');
const enrollmentModel = require('../models/enrollment/enrollment.model');

function createSection(req, res) {
    const section = req.body;
    sectionModel
        .createSection(section)
        .then(function (section) {
            res.json(section);
        });
}

function findSectionsForCourse(req, res) {
    const courseId = req.params['courseId'];
    sectionModel
        .findSectionsForCourse(courseId)
        .then(function (sections) {
            res.json(sections);
        });
}

function findSectionById(req, res) {
    const sectionId = req.params['sectionId'];
    sectionModel
        .findSectionById(sectionId)
        .then(function (sections) {
            res.json(sections);
        });
}

function updateSection(req, res) {
    const sectionId = req.params['sectionId'];
    const section = req.body;
    sectionModel
        .updateSection(sectionId, section)
        .then(function (section) {
            res.json(section);
        });
}

function deleteSection(req, res) {
    const sectionId = req.params['sectionId'];
    sectionModel
        .deleteSection(sectionId)
        .then(function (section) {
            res.json(section);
        });
}

function createEnrollment(req, res) {
    const sectionId = req.params['sectionId'];
    const currentUser = req.session.currentUser;
    const enrollment = {
        student: currentUser._id,
        section: sectionId
    };
    sectionModel
        .decrementSeatsById(sectionId)
        .then(function () {
            return enrollmentModel
                .createEnrollment(enrollment);
        }, function(err) {
            res.status(500).json(err);
        })
        .then(function (section) {
            res.json(section);
        });
}

function deleteEnrollment(req, res) {
    const sectionId = req.params['sectionId'];
    const currentUser = req.session.currentUser;
    const enrollment = {
        student: currentUser._id,
        section: sectionId
    };
    sectionModel
        .incrementSeatsById(sectionId)
        .then(function () {
            return enrollmentModel
                .deleteEnrollment(enrollment);
        })
        .then(function (section) {
            res.json(section);
        });
}

function findSectionsForStudent(req, res) {
    const currentUser = req.session.currentUser;
    enrollmentModel
        .findSectionsForStudent(currentUser._id)
        .then(function (sections) {
            res.json(sections);
        });
}


module.exports = function (app) {
    app.post('/api/course/:courseId/section', createSection);
    app.get('/api/course/:courseId/section', findSectionsForCourse);
    app.get('/api/section/:sectionId', findSectionById);
    app.put('/api/section/:sectionId', updateSection);
    app.delete('/api/section/:sectionId', deleteSection);
    app.post('/api/section/:sectionId/enroll', createEnrollment);
    app.delete('/api/section/:sectionId/enroll', deleteEnrollment);
    app.get('/api/section', findSectionsForStudent);
};
