var db = require('../schema');
var Room = require('../models/room');


var Rooms = new db.Collection();
Rooms.model = Room;

module.exports = Rooms;
