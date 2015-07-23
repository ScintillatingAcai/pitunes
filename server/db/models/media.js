var db = require('../schema');

var Promise = require('bluebird');


var Media = db.Model.extend({
  tableName: 'Medias',
  hasTimestamps: true,

  incrementPlayCount: Promise.promisify(function(callback) {
    return this.fetch().bind(this).then(function(media) {
      this.set('play_count',this.get('play_count') + 1);
      this.save().bind(this).then(function(media) {
        callback();
      });
    });
  }),

  playlists: function() {
    var Playlist = require('./playlist');
    return this.belongsToMany(Playlist,'Media_Playlists', 'media_id', 'playlist_id');
  },
});

module.exports = Media;
