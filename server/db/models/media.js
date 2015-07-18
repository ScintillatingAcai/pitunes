var db = require('../schema');

var Media = db.Model.extend({
  tableName: 'Medias',
  hasTimestamps: true,

  incrementPlayCount: function() {
    this.fetch().then(function(media) {
      media.set('play_count',media.get('play_count') + 1);
      media.save();
    });
  }
});

module.exports = Media;
