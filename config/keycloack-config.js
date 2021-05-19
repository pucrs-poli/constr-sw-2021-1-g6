
var KcAdminClient = require('keycloak-admin').default;
var kcAdminClient = new KcAdminClient();

kcAdminClient.setConfig({
  baseUrl: 'http://18.217.94.36:8080/auth',
  realmName: 'master',
});

module.exports = kcAdminClient;