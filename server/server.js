// dependencies
var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server);
server.listen(3000);

// websocket instantiation requires http
io.on('connection', function (socket) {
  // console.log("connection: " + Object.keys(socket));

  // for(var i in socket) {
  //   console.log(i + ": " + socket[i]);
  // }

  socket.on('user message', function (data) {
    console.log(data);
    socket.broadcast.emit('user message', data);
  });

  socket.on('user room join', function(data){
    socket.join(data.room);
    socket.broadcast.emit("user room join", data.user);
  });

  socket.on('user room leave', function(data){
    socket.broadcast.emit("user room leave", data.user);
    socket.leave(data.room);
  });    
});

require('./middleware.js')(app, express);

// export our app for testing and flexibility, required by index.js
module.exports = app;
