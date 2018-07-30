const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const sectionService = require('./services/section.service');
const userService = require('./services/user.service');

mongoose.connect('mongodb://localhost/CS5610CourseManagerMongoDB');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'App secret'
}));

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin",
        "*");
    res.header("Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Credentials", "true");
    next();
});

function setSession(req, res) {
    const name = req.params['name'];
    req.session[name] = req.params['value'];
    res.send(req.session);
}

function getSession(req, res) {
    const name = req.params['name'];
    const value = req.session[name];
    res.send(value);
}

app.get('/api/session/set/:name/:value', setSession);
app.get('/api/session/get/:name', getSession);

sectionService(app);
userService(app);

app.listen(3000, () => console.log('Example app listening on port 3000!'));
