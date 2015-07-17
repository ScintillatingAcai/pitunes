var db = require('../schema');
var Room = require('../models/room');


var Rooms = db.Collection.extend({
  model: Room
});

module.exports = Rooms;
