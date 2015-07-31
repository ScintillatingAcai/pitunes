var utils = require('./mediasUtils');

module.exports = {

  attachMedia: function(req, res, next, media_id) {
    req.media_id = parseInt(media_id);
    next();
  },

  getMedia: function(req, res, next) {
    utils.retrieveMedia(req.media_id)
    .then(function(media) {
      if (media) {
        res.json(media.toJSON({omitPivot: true}));
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
    var query = require('url').parse(req.url,true).query;
    var num = 10;

    if (query.top && (parseInt(query.top) > 0)) {
      num = parseInt(query.top);
    }

    utils.retrieveTopMedias(num)
    .then(function(media) {
      if (media) {
        res.json(media.toJSON({omitPivot: true}));
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
        res.json(media.toJSON({omitPivot: true}));
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
        res.json(media.toJSON({omitPivot: true}));
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
