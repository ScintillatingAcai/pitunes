var roomsController = require('./roomsController.js');
var utility = require('../utility');

//return all users

module.exports = function(app) {

  app.param('room_id', roomsController.attachRoom);
  app.get('/', roomsController.getRoomsRouter); //get all rooms
  app.post('/', utility.checkUserSession, roomsController.addRoom); //add a room

  app.get('/:room_id', roomsController.getRoom); //get one room
  app.put('/:room_id', utility.checkUserSession, roomsController.updateRoom); //update a room
};

