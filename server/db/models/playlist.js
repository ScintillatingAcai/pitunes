var db = require('../schema');

var Playlist = db.Model.extend({
  tableName: 'Playlists',
  hasTimestamps: true
});

module.exports = Playlist;
