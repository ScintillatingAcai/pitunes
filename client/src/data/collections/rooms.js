var Backbone = require('backbone');

//A Backbone collection for rooms
var RoomsCollection = Backbone.Collection.extend({
  url: 'api/rooms'
});

module.exports = RoomsCollection;