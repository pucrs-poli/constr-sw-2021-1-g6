
var express = require('express');
var app = express();
var kcAdminClient = require('./config/keycloack-config.js');

app.use(express.json());
app.use(express.urlencoded({
    extended: true,
}));


app.use('/auth', require('./src/controller/AuthController'));
app.use('/users', require('./src/controller/UsersController'));


app.listen(3000);