var Promise = require('bluebird');

var userUtils = require('./users/usersUtils');
var roomUtils = require('./rooms/roomsUtils');
var playlistUtils = require('./playlists/playlistsUtils');
var mediasUtils = require('./medias/mediasUtils');

var allClients = [];

var removeUserFromRoom = function(user_id, room_id, callback) {
  if (!user_id) {
    return;
  }

  var room = roomUtils.getRoom(room_id);
  if(room.removeDJFromQueue(user_id)) {
  }
  room.removeUser(user_id).then(function(user) {
    if (callback) {callback();}
  }).catch(function(err) {console.error(err);});
};

var cleanUpClientsForSocket = function(socket, user_id, okRoom_id, callback) {
  for (var i = 0; i < allClients.length; i++) {
    var client = allClients[i];
    if (client.socket === socket || client.user_id === user_id) {

      console.log('checking whether to clean user [',client.user_id,'] out of room: ', client.room_id);

      if (!okRoom_id || parseInt(client.room_id) !== parseInt(okRoom_id) || parseInt(client.user_id) !== parseInt(user_id)) {
        console.log('cleaning room for user [',client.user_id,'] out of room: ', client.room_id);
        allClients[i] = {socket: null, user_id: null, room_id: null};
        removeUserFromRoom(client.user_id, client.room_id, callback);
      }

      if (!okRoom_id || parseInt(client.room_id) !== parseInt(okRoom_id)) {
        //dont pull off socket if the room is the same
        console.log('cleaning socket for user [',client.user_id,'] out of room: ', client.room_id);
        if (okRoom_id) {
          var room = roomUtils.getRoom(okRoom_id);
          room.emitUserStatusMessage(client.socket, client.user_id);
        } else {
          var room = roomUtils.getRoom(client.room_id);
          room.emitUserStatusMessage(client.socket, client.room_id);
        }

        socket.leave(client.room_id);
      }
    }
  }
};

module.exports = function(io) {

  roomUtils.setSocketsForTimer(io.sockets);

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

        room.startUserForCurrentMedia(socket);
        allClients.push({socket: socket, user_id: user_id, room_id: room_id});
        cleanUpClientsForSocket(socket, user_id, room_id);
        room.emitRoomStatusMessage(socket , true);
        return console.log('anon user entered room');
      }

      var user = userUtils.getUser(user_id);

      if (user) {
        socket.join(room_id);
        room.addUser(user).then(function(user) {
          if (!user) return console.error('user already in room');
          room.startUserForCurrentMedia(socket);
          console.log('room users length:  ', room.users.length);

          allClients.push({socket: socket, user_id: user_id, room_id: room_id});
          cleanUpClientsForSocket(socket, user_id, room_id);
          room.emitRoomStatusMessage(socket, true);
        }).catch(function(err) {console.error(err);});
      }
    });

    socket.on('user room leave', function(data){
      console.log('user room leave');
      var user_id = data.user.id;
      var room_id = data.room;

      cleanUpClientsForSocket(socket, user_id, null);
    });

    socket.on('disconnect', function() {
      console.log('disconnected');
      cleanUpClientsForSocket(socket);
    });

    socket.on('user queue join', function(data){
      var user_id = data.user.id;
      var room_id = data.room;

      if (!user_id) return console.error('anon user cannot join queue');

      var room = roomUtils.getRoom(room_id);
      room.enqueueDJ(user_id).then(function(user) {
        if (!user) return console.error('user cannot join queue');

        console.log('should have emitted: ', "user queue change");
        console.log('dj queue length:  ', room.djQueue.length);
      }).catch(function(err) {console.error(err);});
    });

    socket.on('user queue leave', function(data){
      var user_id = data.user.id;
      var room_id = data.room;

      var room = roomUtils.getRoom(room_id);
      if(room.removeDJFromQueue(user_id)) {
      }

      console.log('should have emitted: ', "user queue change");
      console.log('dj queue length:  ', room.djQueue.length);
    });
  });
};
