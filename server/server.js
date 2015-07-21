// dependencies
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen( process.env.NODE_SERVER_PORT || 3000);

console.log('----- PRODUCTION ENVIRONMENT VARIABLES -----');
console.log( 'NODE_SERVER_PORT: ', process.env.NODE_SERVER_PORT);
console.log( 'RDS_HOSTNAME: ', process.env.RDS_HOSTNAME);
console.log( 'RDS_USERNAME: ', process.env.RDS_USERNAME);
console.log( 'RDS_PASSWORD: ', process.env.RDS_PASSWORD);
console.log( 'RDS_PORT: ', process.env.RDS_PORT);
console.log( 'RDS_DB_NAME: ', process.env.RDS_DB_NAME);
console.log('----------');

require('./middleware.js')(app, express, io);

// export our app for testing and flexibility, required by index.js
module.exports = app;
