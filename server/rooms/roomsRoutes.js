var roomsController = require('./roomsController.js');

//return all users

module.exports = function(app) {

  app.post('/', roomsController.addRoom); //add a room

  app.get('/:room', roomsController.getRoom); //get one room
  app.put('/:room', roomsController.updateRoom); //update a room
};

