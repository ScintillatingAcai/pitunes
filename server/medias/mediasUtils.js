var db = require('../db/schema');
var Promise = require('bluebird');
var Medias = require('../db/collections/medias');
var Media = require('../db/models/media');

module.exports = {

  //get a media from DB by ID
  retrieveMedia: Promise.promisify(function(media_id, callback) {
    media_id = parseInt(media_id);

    new Media({
      id: media_id,
    }).fetch().then(function(found) {
      if (found) {
        callback(null, found);
      } else {
        console.log('media_id not found:' + media_id);
        callback(new Error("Media not found"));
      }
    }).catch(function(err) {callback(error);});
  }),

  //update a media in DB by ID
  updateMedia: Promise.promisify( function(media_id, mediaInfo, callback) {
    media_id = parseInt(media_id);

    new Media({
      id: media_id
    }).fetch().then(function(found) {
      if (found) {
        found.set(mediaInfo);
        found.save().then(function(updatedMedia) {
          callback(null, updatedMedia);
        }).catch(function(err) {callback(error);});
      } else {
        console.log('media_id not found:' + media_id);
        callback(new Error("Media not found"));
      }
    }).catch(function(err) {callback(error);});
  }),

  //store a new media in DB
  storeMedia: Promise.promisify( function(media, callback) {
    new Media(media).fetch().then(function(found) {
      if (found) {
        callback(null, found.attributes);
        console.log('media already found:', mediaName);
      } else {
        var media = new Media(media);
        media.save().then(function(newMedia) {
          new Medias().add(newMedia);
          callback(null, newMedia);
        }).catch(function(err) {callback(error);});
      }
    }).catch(function(err) {callback(error);});
  }),

  retrieveTopMedias: Promise.promisify( function (num, callback) {
    new Medias().query(function(qb){
      qb.where('play_count', '>', 0).orderBy('play_count','DESC').limit(num);
    }).fetch().then(function (medias) {
      callback(null, medias);
    }).catch(function(err) {callback(error);});
  })
};
