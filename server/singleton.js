var userUtils = require('./users/usersUtils');
var roomUtils = require('./rooms/roomsUtils');
var playlistUtils = require('./playlists/playlistsUtils');
var mediasUtils = require('./medias/mediasUtils');

module.exports = {
  rooms: null,
  users: null,
  sockets: null
};

console.log("singleton running");

setTimeout(function() {
  module.exports.sockets = roomUtils.getSocketsForTimer();

  roomUtils.retrieveAllRooms(function(err, rooms) {
    module.exports.rooms = rooms;

    module.exports.rooms.each(function(room) {
      room.setSocket(module.exports.sockets);
    });
  });

  var Users = require('./db/collections/users');
  module.exports.users = new Users();

}, 1000);

