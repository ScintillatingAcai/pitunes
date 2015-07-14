var db = require('../schema');

var Playlist = db.Model.extend({
  tableName: 'Playlists',
  hasTimestamps: true,

  medias: function() {
    var Media = require('./media');
    return this.belongsToMany(Media,'Media_Playlists', 'playlist_id', 'media_id');
  }
});

module.exports = Playlist;
