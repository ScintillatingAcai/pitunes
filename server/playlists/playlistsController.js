var utils = require('./playlistsUtils');

module.exports = {

  attachPlaylist: function(req, res, next, playlist_id) {
    console.log('attaching playlist_id: ', playlist_id);
    req.playlist_id = parseInt(playlist_id);
    next();
  },

  getPlaylist: function(req, res, next) {
    var playlist_ID = req.playlist_id;
    console.log('retrieving info for playlist_id:' + playlist_ID);
    utils.retrievePlaylist(playlist_ID)
    .then(function(playlist) {
      if (playlist) {
        res.json(playlist.toJSON({omitPivot: true}));
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
      return next(new Error('controller error: ', error));
    });
  },

  addPlaylist: function(req, res, next) {
    console.log('adding playlist: ',req.body);
    utils.storePlaylist(req.user_id, req.body)
    .then(function(playlist) {
      if (playlist) {
        res.json(playlist.toJSON({omitPivot: true}));
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
      return next(new Error('controller error: ', error));
    });
  },

  updatePlaylist: function(req, res, next) {
    var playlist_ID = req.playlist_id;
    var playlistInfo = req.body;

    utils.updatePlaylist(playlist_ID,playlistInfo)
    .then(function(playlist) {
      if (playlist) {
        res.json(playlist.toJSON({omitPivot: true}));
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
      return next(new Error('controller error: ', error));
    });
  }
};
