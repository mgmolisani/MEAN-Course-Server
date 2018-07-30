const mongoose = require('mongoose');
const userSchema = require('./user.schema');
const userModel = mongoose.model('UserModel', userSchema);

function createUser(user) {
    return userModel.create(user);
}

function findAllUsers() {
    return userModel.find();
}

function findUserById(userId) {
    return userModel.findById(userModel);
}

function findUserByCredentials(credentials) {
    return userModel.findOne(credentials);
}

function updateUser(userId, user) {
    return userModel.findByIdAndUpdate(userId, user, {new: true});
}

function deleteUser(userId) {
    return userModel.findByIdAndRemove(userId);
}

module.exports = {
    createUser: createUser,
    findAllUsers: findAllUsers,
    findUserById: findUserById,
    findUserByCredentials: findUserByCredentials,
    updateUser: updateUser,
    deleteUser: deleteUser
};