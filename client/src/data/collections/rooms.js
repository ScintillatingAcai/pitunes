var Backbone = require('backbone');

var RoomsCollection = Backbone.Collection.extend({
  url: 'api/rooms'
});

module.exports = RoomsCollection;