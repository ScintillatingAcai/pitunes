var db = require('../schema');
var Playlist = require('../models/playlist');


var Playlists = new db.Collection();
Playlists.model = Playlist;

module.exports = Playlists;
