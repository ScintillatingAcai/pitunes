var db = require('../schema');
var Media = require('../models/media');


var Medias = new db.Collection();
Medias.model = Media;

module.exports = Medias;
