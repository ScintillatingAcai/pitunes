var Promise = require('bluebird');

var userUtils = require('./users/usersUtils');
var roomUtils = require('./rooms/roomsUtils');
var playlistUtils = require('./playlists/playlistsUtils');
var mediasUtils = require('./medias/mediasUtils');

var allClients = [];

var addUserToClients = function(user_id, room_id, socket) {
  if (indexOfUserFromSocket(socket) === -1) {
    allClients.push({socket: socket, user_id: user_id, room_id: room_id});
  }
};

var indexOfUserFromSocket = function(socket) {
  for (var i = 0; i < allClients.length; i++) {
    var client = allClients[i];
    if (client.socket === socket) {
      return i;
    }
  }
  return -1;
};

var removeUserFromClients = function(socket) {
  var index = indexOfUserFromSocket(socket);
  var userInfo = allClients[index];
  if (index > -1) {
    allClients.splice(index, 1);
  }
  return userInfo;
};

module.exports = function(io) {

  roomUtils.socketsForTimer(io.sockets);

  io.on('connection', function (socket) {

    socket.on('user message', function (data) {
      console.log('message data: ', data);
      // console.log('user message data: ', data);
      if (socket.rooms.length > 1) {
        socket.broadcast.in(socket.rooms[socket.rooms.length - 1]).emit('user message', data);
      }
    });

    socket.on('user room join', function(data){
      var user_id = data.user.id;
      var room_id = data.room;

      var room = roomUtils.getRoom(room_id);
      if (!user_id) {
        socket.join(room_id);
        socket.in(room_id).emit("user room change",  JSON.stringify(room.users));
        socket.emit("user room change",  JSON.stringify(room.users));
        // socket.emit("user room join", data.user);
        room.startUserForCurrentMedia(socket);
        return console.log('anon user entered room');
      }

      userUtils.retrieveUser(user_id).then(function(user) {
        room.addUser(user).then(function(user) {
          if (!user) return console.error('user already in room');
          socket.join(room_id);
          socket.in(room_id).emit("user room change",  JSON.stringify(room.users));
          socket.emit("user room change",  JSON.stringify(room.users));
          // socket.emit("user room join", data.user);
          room.startUserForCurrentMedia(socket);
          console.log('should have emitted: ', "user room change");
          console.log('room users length:  ', room.users.length);

          allClients.push({socket: socket, user_id: user_id, room_id: room_id});
        }).catch(function(err) {console.error(err);});
      });
    });

    socket.on('user room leave', function(data){
      var user_id = data.user.id;
      var room_id = data.room;

      var room = roomUtils.getRoom(room_id);
      if (!user_id) {
        socket.broadcast.in(room_id).emit("user room change", JSON.stringify(room.users));
        socket.leave(room_id);
        // socket.emit("user room leave", data.user.id);
        return console.log('anon user left room');
      }

      if(room.removeDJFromQueue(user_id)) {
        //just in case they are in queue we will update and broadcast
        socket.broadcast.in(room_id).emit("user queue change", JSON.stringify(room.djQueue));
        // socket.emit("user queue change", data.user.id);
        // socket.emit("user queue leave", data.user.id);
      }
      room.removeUser(user_id).then(function(user) {
        socket.broadcast.in(room_id).emit("user room change", JSON.stringify(room.users));
        socket.emit("user room change", JSON.stringify(room.users));
        socket.leave(room_id);
        // socket.emit("user room leave", data.user.id);


        console.log('should have emitted: ', "user room change");
        console.log('room users length:  ', room.users.length);
      }).catch(function(err) {console.error(err);});
    });

    socket.on('disconnect', function() {

      var index = indexOfUserFromSocket(socket);
      if (index > -1) {
        var userInfo = allClients[index];
        var user_id = userInfo.user_id;
        var room_id = userInfo.room_id;
        removeUserFromClients(socket);
        console.log('Disconnected User: ', user_id);

        var room = roomUtils.getRoom(room_id);
        if(room.removeDJFromQueue(user_id)) {
          //just in case they are in queue we will update and broadcast
          socket.broadcast.in(room_id).emit("user queue change", JSON.stringify(room.djQueue));
          // socket.emit("user queue change", user_id);
          // socket.emit("user queue leave", user_id);
        }
        room.removeUser(user_id).then(function(user) {
          socket.broadcast.in(room_id).emit("user room change", JSON.stringify(room.users));
          socket.emit("user room change", JSON.stringify(room.users));
          socket.leave(room_id);
          // socket.emit("user room leave", user_id);

          console.log('should have emitted: ', "user room change");
          console.log('room users length:  ', room.users.length);
        }).catch(function(err) {console.error(err);});
      }
    });

    socket.on('user queue join', function(data){
      var user_id = data.user.id;
      var room_id = data.room;

      if (!user_id) return console.error('anon user cannot join queue');

      var room = roomUtils.getRoom(room_id);
      room.enqueueDJ(user_id, io.sockets).then(function(user) {
        if (!user) return console.error('user cannot join queue');
        socket.broadcast.in(room_id).emit("user queue change", JSON.stringify(room.djQueue));
        socket.emit("user queue change", JSON.stringify(room.djQueue));
        // socket.emit("user queue join", user_id);

        console.log('should have emitted: ', "user queue change");
        console.log('dj queue length:  ', room.djQueue.length);
      }).catch(function(err) {console.error(err);});
    });

    socket.on('user queue leave', function(data){
      var user_id = data.user.id;
      var room_id = data.room;

      var room = roomUtils.getRoom(room_id);
      if(room.removeDJFromQueue(user_id)) {
        //just in case they are in queue we will update and broadcast
        socket.broadcast.in(room_id).emit("user queue change", JSON.stringify(room.djQueue));
        socket.emit("user queue change", JSON.stringify(room.djQueue));
        // socket.emit("user queue leave", user_id);
      }

      console.log('should have emitted: ', "user queue change");
      console.log('dj queue length:  ', room.djQueue.length);
    });
  });
};