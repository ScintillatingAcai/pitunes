var url = require('url');
var utils = require('./playlistsUtils');
var Promise = require('bluebird');

module.exports = {

  attachPlaylist: function(req, res, next, playlist_id) {
    console.log('attaching playlist_id: ', playlist_id);
    req.playlist_id = parseInt(playlist_id);
    next();
  },

  getPlaylist: function(req, res, next) {
    var playlist_ID = req.playlist_id;
    console.log('retrieving info for playlist_id:' + playlist_ID);
    var R = Promise.promisify(utils.retrievePlaylist);
    R(playlist_ID).then(function(playlist) {
      if (playlist) {
        res.json(playlist);
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
    var R = Promise.promisify(utils.storePlaylist);
    R(req.user_id, req.body).then(function(playlist) {
      if (playlist) {
        res.json(playlist);
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

    // console.log('updating playlist_id:', playlist_ID, ' with info: ', playlistInfo );
    utils.updatePlaylist(playlist_ID,playlistInfo).then(function(playlist) {
      if (playlist) {
        res.json(playlist);
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
