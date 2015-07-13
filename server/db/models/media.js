var db = require('../schema');

var Media = db.Model.extend({
  tableName: 'Medias',
  hasTimestamps: true
});

module.exports = Media;
