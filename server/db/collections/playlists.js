var db = require('../schema');
var Playlist = require('../models/playlist');


var Playlists = db.Collection.extend({
  model: Playlist
});

module.exports = Playlists;
