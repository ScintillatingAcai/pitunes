var url = require('url');
var utils = require('./mediasUtils');
var Promise = require('bluebird');

module.exports = {

  getMedia: function(req, res) {
    var media_id = (url.parse(req.url).pathname).slice(1);
    console.log('retrieving info for media_id:' + media_id);
    var R = Promise.promisify(utils.retrieveMedia);
    R(media_id).then(function(media) {
      if (media) {
        res.json(media);
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
    });
  },

  addMedia: function(req, res) {
    console.log('adding media: ',req.body);
    var R = Promise.promisify(utils.storeMedia);
    R(req.body).then(function(media) {
      if (media) {
        res.json(media);
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
    });
  },

  updateMedia: function(req, res) {
    var media_id = (url.parse(req.url).pathname).slice(1);
    var mediaInfo = req.body;

    console.log('updating media_id:', media_id, ' with info: ', mediaInfo );
    var R = Promise.promisify(utils.updateMedia);
    R(media_ID,playlistInfo).then(function(media) {
      if (media) {
        res.json(media);
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
    });
  }


};