var playlistsController = require('./playlistsController.js');
var utility = require('../utility');

module.exports = function(app) {

  app.param('playlist_id', playlistsController.attachPlaylist);

  app.post('/', utility.checkUserSession, playlistsController.addPlaylist); //add a playlist

  app.get('/:playlist_id', playlistsController.getPlaylist); //get one playlist
  app.put('/:playlist_id', utility.checkUserSession, playlistsController.updatePlaylist); //update a playlist
};

