var db = require('../schema');

var Playlist = db.Model.extend({
  tableName: 'Playlists',
  hasTimestamps: true,

  initialize: function(){
    this.on('fetched', function() {
      // console.log('FETCH!!');
      this.retrieveCurrentMedia(function(err, media) {
        this.currentMedia = media;
        console.log('retrieved media (id): ', this.currentMedia.get('id'));

      }.bind(this));
    }.bind(this));
  },

  currentMedia: null,

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

  incrementCurrentMediaIndex:function() {
    var mediaCount = this.get('current_media_index');
  },

  setCurrentMedia: function( currentMedia_ID ){
    this.set('current_media_index', currentMedia_ID);
    this.save().then(function(currentMedia) {
      this.retrieveCurrentPlaylist(function(err, currentMedia) {
        this.currentMedia = currentMedia;
      }.bind(this));
    }.bind(this));
  },

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
