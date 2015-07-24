var db = require('../schema');
var Media_Playlist = require('../models/media_playlist');


var Media_Playlists = db.Collection.extend({
  model: Media_Playlist
});

module.exports = Media_Playlists;
