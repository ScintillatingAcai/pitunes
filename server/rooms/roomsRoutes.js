var roomsController = require('./roomsController.js');

//return all users

module.exports = function(app) {

  app.param('room_id', roomsController.attachRoom);
  app.get('/', roomsController.getAllRooms); //get all rooms
  app.post('/', roomsController.addRoom); //add a room

  app.get('/top/3', roomsController.getTop3Rooms); // get top 3 rooms 

  app.get('/:room_id', roomsController.getRoom); //get one room
  app.put('/:room_id', roomsController.updateRoom); //update a room
  app.post('/:room_id/addDJ', roomsController.addDJToQueue); //add a DJ to room

};

