var db = require('../schema');
var Promise = require('bluebird');


var Playlist = db.Model.extend({
  tableName: 'Playlists',
  hasTimestamps: true,

  medias: function() {
    var Media = require('./media');
    return this.belongsToMany(Media,'Media_Playlists', 'playlist_id', 'media_id');
  },

  user: function() {
    //invoking require at runtime so we avoid circular dependency on User
    var User = require('./user');
    return this.belongsTo(User, 'user_id');
  },

  getCurrentMedia:Promise.promisify(function(callback) {
    return this.retrieveCurrentMedia(callback);
  }),

  incrementCurrentMediaIndex:Promise.promisify(function(callback) {
    // get medias in playlist to find length
    this.medias().fetch().bind(this)
    .then(function(found) {
      if (!found) return callback(new Error('medias not found'));
      var mediaCount = found.length;
      return ( this.get('current_media_index') % mediaCount) + 1; //order starts at 1 insead of 0
    }).bind(this)
    .then(function(mediaIndex) {
      console.log('incremented media media index: ', mediaIndex);
      this.setCurrentMedia(mediaIndex);
    });
  }),

  setCurrentMedia: Promise.promisify(function( currentMedia_ID , callback){
    this.set('current_media_index', currentMedia_ID);

    this.save().bind(this).then(function(playlist) {
      this.retrieveCurrentMedia(function(err, currentMedia) {
        this.currentMedia = currentMedia;
        callback(null, currentMedia);
      }.bind(this));
    });
  }),

  retrieveCurrentMedia: function(callback){
    var mediaIndex = this.get('current_media_index');
    if (mediaIndex === 0) return callback(null, null); //send back 0 which indicates no playlist but not an error

    this.medias().query({where: {media_order: mediaIndex}}).fetchOne()
    .then(function(found) {
      if (!found) return callback(new Error('media not found'));
      console.log('retrieved current media index: ', mediaIndex);
      callback(null,found);
    })
    .catch(function(error) {
      callback(error);
    });
  },

  retrievePlaylist: Promise.promisify(function( callback ) {

    this.medias().query(function(qb){
      qb.orderBy('media_order','ASC');
    }).fetch()
    .then(function(found) {
      if (!found) return callback(new Error('media not found'));
      console.log('retrieved current media');
      callback(null,found);
    })
    .catch(function(error) {
      callback(error);
    });
  })
});

module.exports = Playlist;
