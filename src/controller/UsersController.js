
var express = require('express');
var route = express.Router();
var kcAdminClient = require('../../config/keycloack-config.js');

route.post('/', async function (requisition, response) {
    
    var { username, 
        email, 
        firstName, 
        lastName,
        emailVerified,
        enabled 
    } = requisition.body;

    var resp;
    console.log(requisition.body);

    try {
        resp = await kcAdminClient.users.create({
            username,
            email,
            firstName,
            lastName,
            emailVerified,
            enabled,
        });
    } catch (error) {
        console.log(error);
        response.status(400).send(error);
    }
    response.status(200).send(resp);

});


route.get('/', async function (requisition, response) {
    var users;

    try {
        users = await kcAdminClient.users.find();
    } catch (error) {
        console.log(error);
        response.status(400).send(error);
    }

    response.send(users);

});


route.get('/:id', async function (requisition, response) {
    var user;

    try {
        user = await kcAdminClient.users.findOne({ id: requisition.params.id });
    } catch (error) {
        console.log(error);
        response.status(400).send(error);
    }

    response.status(200).send(user);

});


route.put('/:id', async function (requisition, response) {
    var { 
        firstName, 
        lastName 
    } = requisition.body;

    var resp;

    try {
        resp = await kcAdminClient.users.update(
            { id: requisition.params.id },
            {
                firstName,
                lastName,
                requiredActions: [],
                emailVerified: true,
            }
        );
    } catch (error) {
        console.log(error);
        response.status(400).send(error);
    }

    response.status(200).send(resp);

});


route.patch('/:id', async function (requisition, response) {
    var { credentials } = requisition.body;
    var { id } = requisition.params;
    var resp;

    try {
        resp = await kcAdminClient.users.update(
            { id },
            {
                credentials
            }
        );
    } catch (error) {
        console.log(error);
        response.status(400).send(error);
    }

    response.status(200).send(resp);

});


route.delete('/:id', async function (requisition, response) {
    var users;

    try {
        users = await kcAdminClient.users.del({ id: requisition.params.id });
    } catch (error) {
        console.log(error);
        response.status(400).send(error);
    }

    response.status(200).send();

});

module.exports = route;