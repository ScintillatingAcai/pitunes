var db = require('../schema');
var Promise = require('bluebird');

var Media_Playlist = db.Model.extend({
  tableName: 'Media_Playlists',
  hasTimestamps: false
});

module.exports = Media_Playlist;
