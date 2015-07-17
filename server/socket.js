var userUtils = require('./users/usersUtils');
var roomUtils = require('./rooms/roomsUtils');
var playlistUtils = require('./playlists/playlistsUtils');
var mediasUtils = require('./medias/mediasUtils');

module.exports = function(io) {

  io.on('connection', function (socket) {

    socket.on('user message', function (data) {
      console.log(data);
      socket.broadcast.emit('user message', data);
    });

    socket.on('user room join', function(data){
      // var room_id = data.room;
      // var room = roomUtils.getRoom(room_id);
      // room.addUser(user);
      socket.join(data.room);
      socket.broadcast.emit("user room join", data.user);
    });

    socket.on('user room leave', function(data){
      socket.broadcast.emit("user room leave", data.user);
      socket.leave(data.room);
    });
  });
};