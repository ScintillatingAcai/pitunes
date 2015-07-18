var userUtils = require('./users/usersUtils');
var roomUtils = require('./rooms/roomsUtils');
var playlistUtils = require('./playlists/playlistsUtils');
var mediasUtils = require('./medias/mediasUtils');

module.exports = {
  rooms: null
};

roomUtils.retrieveAllRooms(function(err, rooms) {
  module.exports.rooms = rooms;
});