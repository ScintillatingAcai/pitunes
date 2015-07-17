var db = require('../schema');
var Media = require('../models/media');


var Medias = db.Collection.extend({
  model: Media
});

module.exports = Medias;
