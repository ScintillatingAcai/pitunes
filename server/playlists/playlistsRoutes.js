var playlistsController = require('./playlistsController.js');

module.exports = function(app) {

  app.param('playlist_id', playlistsController.attachPlaylist);

  app.post('/', playlistsController.addPlaylist); //add a playlist

  app.get('/:playlist_id', playlistsController.getPlaylist); //get one playlist
  app.put('/:playlist_id', playlistsController.updatePlaylist); //update a playlist
};

