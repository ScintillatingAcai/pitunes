var Backbone = require('backbone');
var MediaModel = require('../models/media.js');

var MediasCollection = Backbone.Collection.extend({
  model: MediaModel,
  initialize: function (params) {
    // this.on("delete", function (media) {
    //   this.remove(media);
    // }.bind(this));
  }
});

module.exports = MediasCollection;