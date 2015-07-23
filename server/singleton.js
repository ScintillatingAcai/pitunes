var userUtils = require('./users/usersUtils');
var roomUtils = require('./rooms/roomsUtils');
var playlistUtils = require('./playlists/playlistsUtils');
var mediasUtils = require('./medias/mediasUtils'); 

module.exports = {
  rooms: null,
  users: null
};

console.log("singleton running");

setTimeout(function() {
  roomUtils.retrieveAllRooms(function(err, rooms) {
    module.exports.rooms = rooms;
  });
  var Users = require('./db/collections/users');
  module.exports.users = new Users();
}, 1000);

