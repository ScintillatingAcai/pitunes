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
  app.get('/loggedin', usersController.getSessionUser); //logout a user

  app.get('/:user_id', utility.checkUserSession, usersController.getUser); //get one user
  app.put('/:user_id', utility.checkUserSession, usersController.updateUser); //update a user

  app.get('/:user_id/playlists', utility.checkUserSession, usersController.getAllUserPlaylists); // Get all User's playlists
  app.post('/:user_id/playlists', utility.checkUserSession, playlistsController.addPlaylist); // Creates a new playlist
  app.get('/:user_id/playlists/:playlist_id', utility.checkUserSession, playlistsController.getPlaylist); // Returns the current specific playlist
  app.put('/:user_id/playlists/:playlist_id', utility.checkUserSession, playlistsController.updatePlaylist); // Updates the current playlist
  app.delete('/:user_id/playlists/:playlist_id', utility.checkUserSession, playlistsController.deletePlaylist, usersController.setLastPlaylistCurrent); // Delete the current playlist and set the last playlist current

  app.put('/:user_id/playlists/:playlist_id/current', utility.checkUserSession, usersController.setCurrentPlaylist); // Sets the current playlist to the default
  
  // added route for testing w/o authentication
  // app.get('/:user_id/playlists', usersController.getAllUserPlaylists); // Get all User's playlists
  // app.post('/:user_id/playlists', playlistsController.addPlaylist); // Creates a new playlist
  // app.get('/:user_id/playlists/:playlist_id', playlistsController.getPlaylist); // Returns the current specific playlist
  // app.put('/:user_id/playlists/:playlist_id', playlistsController.updatePlaylist); // Updates the current playlist
  // app.delete('/:user_id/playlists/:playlist_id', playlistsController.deletePlaylist, usersController.setLastPlaylistCurrent);//, usersController.setCurrentPlaylist); // Delete the current playlist and set the last playlist current

  // app.put('/:user_id/playlists/:playlist_id/current', usersController.setCurrentPlaylist); // Sets the current playlist to the default
};

