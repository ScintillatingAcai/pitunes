var playlistsController = require('./playlistsController.js');

module.exports = function(app) {

  app.post('/', playlistsController.addPlaylist); //add a playlist

  app.get('/:playlist', playlistsController.getPlaylist); //get one playlist
  app.put('/:playlist', playlistsController.updatePlaylist); //update a playlist
};

