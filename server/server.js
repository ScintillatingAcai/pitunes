// dependencies
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(3000);


require('./middleware.js')(app, express, io);

// export our app for testing and flexibility, required by index.js
module.exports = app;
