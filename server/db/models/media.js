var db = require('../schema');

var Media = db.Model.extend({
  tableName: 'Medias',
  hasTimestamps: true,

  incrementPlayCount: function() {
    this.fetch().then(function(media) {
      media.set('play_count',media.get('play_count') + 1);
      media.save();
    });
  },

  playlists: function() {
    var Playlist = require('./playlist');
    return this.belongsToMany(Playlist,'Media_Playlists', 'media_id', 'playlist_id');
  },
});

module.exports = Media;
