var db = require('../schema');
var Promise = require('bluebird');


var Playlist = db.Model.extend({
  tableName: 'Playlists',
  hasTimestamps: true,

  initialize: function(){
    this.currentMedia = null;

    var that = this;
    this.on('fetched', Promise.promisify(function(a, b, c, callback) {
      // console.log('FETCH!!');
      this.retrieveCurrentMedia(function(err, media) {
        that.currentMedia = media;
        console.log('retrieved media (id): ', that.currentMedia.get('id'));
        callback();
      });
    }), this);
  },

  medias: function() {
    var Media = require('./media');
    return this.belongsToMany(Media,'Media_Playlists', 'playlist_id', 'media_id');
  },

  user: function() {
    //invoking require at runtime so we avoid circular dependency on User
    var User = require('./user');
    return this.belongsTo(User, 'user_id');
  },

  getCurrentMedia:function() {
    return this.currentMedia;
  },

  incrementCurrentMediaIndex:Promise.promisify(function(callback) {
    // get medias in playlist to find length
    var that = this;
    this.medias().fetch().bind(this)
    .then(function(found) {
      if (!found) return callback(new Error('medias not found'));
      var mediaCount = found.length;
      return (( this.get('current_media_index') + 1 ) % mediaCount) + 1; //order starts at 1 insead of 0
    }).bind(this)
    .then(function(mediaIndex) {
      console.log('incremented media index: ', mediaIndex);
      this.setCurrentMedia(mediaIndex);
    });
  }),

  setCurrentMedia: Promise.promisify(function( currentMedia_ID , callback){
    this.set('current_media_index', currentMedia_ID);

    this.save().bind(this).then(function(playlist) {
      console.log('test:');
      this.retrieveCurrentMedia(function(err, currentMedia) {
        console.log('current media index updated: ', this.get('current_media_index'));
        this.currentMedia = currentMedia;
        callback(null, currentMedia);
      }.bind(this));
    });
  }),

  retrieveCurrentMedia: function(callback){
    var mediaIndex = this.get('current_media_index');
    if (mediaIndex === 0) return callback(null, null); //send back 0 which indicates no playlist but not an error

    console.log('retrieving current media index: ', mediaIndex);
    this.medias().query({where: {media_order: mediaIndex}}).fetchOne()
    .then(function(found) {
      if (!found) return callback(new Error('media not found'));
      console.log('retrieved current media');
      callback(null,found);
    })
    .catch(function(error) {
      callback(error);
    });
  },
});

module.exports = Playlist;
