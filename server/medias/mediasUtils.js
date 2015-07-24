var db = require('../db/schema');
var Medias = require('../db/collections/medias');
var Media = require('../db/models/media');

module.exports = {

  //get a media from DB by ID
  retrieveMedia: function(media_id, callback) {
    media_id = parseInt(media_id);

    new Media({
        id: media_id,
      }).fetch({
        //add related data we would like to return in the withRelated array
        withRelated: [],
        require: true
      }).then(function(found) {
        if (found) {
          var mediaWithJoins = cleanAttributes(found.attributes);

          // this is an example of how to add related data to the response object
          // mediaWithJoins.events = [];
          // found.relations.events.forEach(function(item) {
          //    mediaWithJoins.events.push(cleanAttributes(item.attributes));
          // });

          callback(null, mediaWithJoins);
        } else {
          console.log('media_id not found:' + media_id);
        }
      })
      .catch(function(error) {
        console.log('error:', error);
      });
  },

  //update a media in DB by ID
  updateMedia: function(media_id, mediaInfo, callback) {
    media_id = parseInt(media_id);
    new Media({
        id: media_id
      }).fetch().then(function(found) {
        if (found) {
            found.set(mediaInfo);
          found.save().then(function(updatedMedia) {
              callback(null, updatedMedia);
            })
            .catch(function(error) {
              console.log('error:', error);
            });
        } else {
          console.log('media_id not found:' + media_id);
        }
      })
      .catch(function(error) {
        console.log('error:', error);
      });
  },

  //store a new media in DB
  storeMedia: function(media, callback) {

    new Media(media).fetch().then(function(found) {

        if (found) {
          callback(null, found.attributes);
          console.log('media already found:', mediaName);

        } else {

          var media = new Media(media);

          media.save().then(function(newMedia) {
              new Medias().add(newMedia);
              callback(null, newMedia);
            })
            .catch(function(error) {
              console.log('error:', error);
            });
        }
      })
      .catch(function(error) {
        console.log('error:', error);
      });
  }
};
