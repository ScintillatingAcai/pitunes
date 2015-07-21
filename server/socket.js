var userUtils = require('./users/usersUtils');
var roomUtils = require('./rooms/roomsUtils');
var playlistUtils = require('./playlists/playlistsUtils');
var mediasUtils = require('./medias/mediasUtils');

var Promise = require('bluebird');

module.exports = function(io) {

  roomUtils.socketsForTimer(io.sockets);

  io.on('connection', function (socket) {

    socket.on('user message', function (data) {
      console.log('user message data: ', data);
      socket.broadcast.emit('user message', data);
    });

    socket.on('user room join', function(data){
      console.log('user room join data: ', data);
      var user_id = data.user;
      var room_id = data.room;

      var R = Promise.promisify(userUtils.retrieveUser);
      R(user_id).then(function(user) {
        var room = roomUtils.getRoom(room_id);
        room.addUser(user);
        socket.join(data.room);
        socket.broadcast.emit("user room change", data.user);
        socket.emit("user room join", data.user);
        room.startUserForCurrentMedia(socket);
        console.log('should have emitted: ', "user room join");
        console.log('room users length:  ', room.users.length);
      });
    });

    socket.on('user room leave', function(data){
      console.log('user room leave data: ', data);
      var user_id = data.user;
      var room_id = data.room;

      var room = roomUtils.getRoom(room_id);
      if(room.removeDJFromQueue(user_id)) {
        //just in case they are in queue we will update and broadcast
        socket.broadcast.emit("user queue change", JSON.stringify(room.djQueue));
        socket.emit("user queue leave", data.user);
      }

      room.removeUser(user_id);
      socket.broadcast.emit("user room change", data.user);
      socket.emit("user room leave", data.user);
      socket.leave(data.room);

      console.log('should have emitted: ', "user room leave");
      console.log('room users length:  ', room.users.length);
    });

    socket.on('user queue join', function(data){
      console.log('user queue join data: ', data);
      var user_id = data.user;
      var room_id = data.room;

      var room = roomUtils.getRoom(room_id);
      room.enqueueDJ(user_id, io.sockets);

      socket.broadcast.emit("user queue change", JSON.stringify(room.djQueue));
      socket.emit("user queue join", data.user);

      console.log('should have emitted: ', "user queue change");
      console.log('dj queue length:  ', room.djQueue.length);
    });

    socket.on('user queue leave', function(data){
      console.log('user queue leave data: ', data);
      var user_id = data.user;
      var room_id = data.room;

      var room = roomUtils.getRoom(room_id);
      if(room.removeDJFromQueue(user_id)) {
        //just in case they are in queue we will update and broadcast
        socket.broadcast.emit("user queue change", JSON.stringify(room.djQueue));
        socket.emit("user queue leave", data.user);
      }

      console.log('should have emitted: ', "user queue change");
      console.log('dj queue length:  ', room.djQueue.length);
    });
  });
};