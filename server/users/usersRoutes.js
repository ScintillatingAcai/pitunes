var usersController = require('./usersController.js');
var playlistsController = require('../playlists/playlistsController');
var utility = require('../utility');
//return all users

module.exports = function(app) {

  app.param('user_id', usersController.attachUser);
  app.param('playlist_id', playlistsController.attachPlaylist);

  app.post('/signup', usersController.addUser); //add a user

  app.post('/login', usersController.loginUser); //login a user
  app.get('/logout', usersController.logoutUser); //logout a user

  app.get('/:user_id', utility.checkUserSession, usersController.getUser); //get one user
  app.put('/:user_id', utility.checkUserSession, usersController.updateUser); //update a user

  // app.get('/:user_id/playlists', utility.checkUserSession, usersController.getAllUserPlaylists);
  // app.post('/:user_id/playlists', utility.checkUserSession, playlistsController.addPlaylist);
  // app.get('/:user_id/playlists/:playlist_id', utility.checkUserSession, playlistsController.getPlaylist);
  // app.put('/:user_id/playlists/:playlist_id', utility.checkUserSession, playlistsController.updatePlaylist);

  
  // added route for testing w/o authentication
  app.get('/:user_id/playlists', usersController.getAllUserPlaylists);
  app.post('/:user_id/playlists', playlistsController.addPlaylist);
  app.get('/:user_id/playlists/:playlist_id', playlistsController.getPlaylist);
  app.put('/:user_id/playlists/:playlist_id', playlistsController.updatePlaylist);
};

