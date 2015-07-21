var usersController = require('./usersController.js');
var utility = require('../utility');
//return all users

module.exports = function(app) {

  app.param('user_id', usersController.attachUser);

  app.post('/signup', usersController.addUser); //add a user

  app.post('/login', usersController.loginUser); //login a user
  app.get('/logout', usersController.logoutUser); //logout a user

  app.get('/:user_id', utility.checkUserSession, usersController.getUser); //get one user
  app.put('/:user_id', utility.checkUserSession, usersController.updateUser); //update a user

  // added route for testing w/o authentication
  // app.get('/:user_id/playlists', utility.checkUserSession, usersController.getAllUserPlaylists);
  app.get('/:user_id/playlists', usersController.getAllUserPlaylists);
  app.put('/:user_id/playlists', utility.checkUserSession, usersController.addUserPlaylist);
};

