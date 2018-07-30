const userModel = require('../models/user/user.model');


function createUser(req, res) {
    const user = req.body;
    userModel.createUser(user)
        .then(function (user) {
            req.session['currentUser'] = user;
            res.send(user);
        })
}

function login(req, res) {
    const credentials = req.body;
    userModel
        .findUserByCredentials(credentials)
        .then(function(user) {
            req.session['currentUser'] = user;
            res.json(user);
        });
}

function logout(req, res) {
    req.session.destroy();
    res.sendStatus(200);
}

function getProfile(req, res) {
    res.json(req.session['currentUser']);
}

function updateUser(req, res) {
    const currentUser = req.session.currentUser;
    const user = req.body;
    userModel
        .updateUser(currentUser._id, user)
        .then(function (user) {
            req.session['currentUser'] = user;
            res.json(user);
        })
}

function deleteUser(req, res) {
    const currentUser = req.session.currentUser;
    userModel
        .deleteUser(currentUser._id)
        .then(function() {
            req.session.destroy();
            res.sendStatus(200);
        })
}

module.exports = function (app) {
    app.post('/api/register', createUser);
    app.post('/api/login', login);
    app.post('/api/logout', logout);
    app.get('/api/profile', getProfile);
    app.put('/api/profile', updateUser);
    app.delete('/api/profile', deleteUser);
};
