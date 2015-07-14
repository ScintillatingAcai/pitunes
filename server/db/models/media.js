var db = require('../schema');

var Media = db.Model.extend({
  tableName: 'Medias',
  hasTimestamps: true,

  incrementPlayCount: function() {
    this.set('play_count',this.get('play_count') + 1);
    this.save();
  }
});

module.exports = Media;
