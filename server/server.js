// dependencies
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);

var port = process.env.PORT || 3000;
console.log("piTunes is listening on port " + port);
server.listen(port);

// websocket instantiation requires http

require('./middleware.js')(app, express, io);

// export our app for testing and flexibility, required by index.js
module.exports = app;
