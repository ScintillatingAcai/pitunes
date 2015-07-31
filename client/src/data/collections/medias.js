var Backbone = require('backbone');
var MediaModel = require('../models/media.js');

var MediasCollection = Backbone.Collection.extend({
  model: MediaModel
});

module.exports = MediasCollection;