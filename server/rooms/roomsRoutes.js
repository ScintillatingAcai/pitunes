var roomsController = require('./roomsController.js');

//return all users

module.exports = function(app) {

  app.param('room_id', roomsController.attachRoom);

  app.post('/:room_id/addDJ', roomsController.addDJToQueue); //add a DJ to room

  app.get('/:room_id', roomsController.getRoom); //get one room
  app.put('/:room_id', roomsController.updateRoom); //update a room

  app.post('/', roomsController.addRoom); //add a room
  app.get('/', roomsController.getAllRooms); //get all rooms


};

