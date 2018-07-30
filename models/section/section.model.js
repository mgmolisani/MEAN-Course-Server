const mongoose = require('mongoose');
const sectionSchema = require('./section.schema');
const sectionModel = mongoose.model('SectionModel', sectionSchema);

function createSection(section) {
    return sectionModel.create(section);
}

function findSectionsForCourse(courseId) {
    return sectionModel.find({courseId: courseId});
}

function findSectionById(sectionId) {
    return sectionModel.findById(sectionId);
}

function updateSection(sectionId, section) {
    return sectionModel.findByIdAndUpdate(sectionId, section, {new: true});
}

function deleteSection(sectionId) {
    return sectionModel.findByIdAndRemove(sectionId);
}

function decrementSeatsById(sectionId) {
    return findSectionById(sectionId)
        .then(function (section) {
            if (section && section.seats > 0) {
                return sectionModel.findByIdAndUpdate(sectionId,
                    {
                        $inc: {seats: -1}
                    },
                    {new: true});
            } else {
                throw new Error('All seats have been filled');
            }
        });
}

function incrementSeatsById(sectionId) {
    return sectionModel.findByIdAndUpdate(sectionId,
        {
            $inc: {seats: +1}
        },
        {new: true});
}

module.exports = {
    createSection: createSection,
    findSectionsForCourse: findSectionsForCourse,
    findSectionById: findSectionById,
    updateSection: updateSection,
    deleteSection: deleteSection,
    decrementSeatsById: decrementSeatsById,
    incrementSeatsById: incrementSeatsById,
};