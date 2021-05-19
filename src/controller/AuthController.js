
var express = require('express');
var route = express.Router();
var kcAdminClient = require('../../config/keycloack-config.js');

route.post('/', async (requisition, response) => {    
    var { username, password, grantType, clientId, totp, clientSecret } = requisition.body;


    try {
        await kcAdminClient.auth({
            username,
            password,
            grantType,
            clientId,
            totp,
            clientSecret,
        });

        response.status(200).send({
            accessToken: kcAdminClient.accessToken,
            refreshToken: kcAdminClient.refreshToken,
        });
    } catch (error) {
        console.log(error);
        response.status(400).send(error);
    }
});

module.exports = route;