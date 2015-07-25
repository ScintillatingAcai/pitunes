var url = require('url');
var utils = require('./mediasUtils');
var Promise = require('bluebird');

module.exports = {

  attachMedia: function(req, res, next, media_id) {
    console.log('attaching media_id: ', media_id);
    req.media_id = parseInt(media_id);
    next();
  },

  getMedia: function(req, res, next) {
    console.log('retrieving info for media_id:' + req.media_id);
    utils.retrieveMedia(req.media_id)
    .then(function(media) {
      if (media) {
        res.json(media);
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
      return next(new Error('controller error: ', error));
    });
  },

  getTopMedias: function(req, res, next) {
    utils.retrieveTopMedias()
    .then(function(media) {
      if (media) {
        res.json(media);
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
      return next(new Error('controller error: ', error));
    });
  },

  addMedia: function(req, res, next) {
    console.log('adding media: ',req.body);
    utils.storeMedia(req.body)
    .then(function(media) {
      if (media) {
        res.json(media);
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
      return next(new Error('controller error: ', error));
    });
  },

  updateMedia: function(req, res, next) {
    var mediaInfo = req.body;

    console.log('updating media_id:', req.media_id, ' with info: ', mediaInfo );
    utils.updateMedia(req.media_id, playlistInfo)
    .then(function(media) {
      if (media) {
        res.json(media);
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
