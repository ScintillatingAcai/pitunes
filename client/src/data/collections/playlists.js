var Backbone = require('backbone');
var PlaylistModel = require('../models/playlist.js');

var PlaylistsCollection = Backbone.Collection.extend({
  model: PlaylistModel
});

module.exports = PlaylistsCollection;