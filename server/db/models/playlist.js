var db = require('../schema');
var Promise = require('bluebird');


var Playlist = db.Model.extend({
  tableName: 'Playlists',
  hasTimestamps: true,

  medias: function() {
    var Media = require('./media');
    return this.belongsToMany(Media,'Media_Playlists', 'playlist_id', 'media_id').query(function(qb){
      qb.orderBy('media_order','ASC');
    });
  },

  user: function() {
    //invoking require at runtime so we avoid circular dependency on User
    var User = require('./user');
    return this.belongsTo(User, 'user_id');
  },

  getCurrentMedia: Promise.promisify(function(callback) {
    return this.retrieveCurrentMedia().then(function(media) {
      if (!media) return callback(new Error('no media in playlist'));
      callback(null, media);
    })
    .catch(function(err) {
      callback(err);
    });
  }),

  incrementCurrentMediaIndex: Promise.promisify(function(callback) {
    // get medias in playlist to find length
    return this.medias().fetch().bind(this)
    .then(function(medias) {
      if (!medias || medias.length === 0) return callback(new Error('medias not found'));
      return ( this.get('current_media_index') % medias.length) + 1; //order starts at 1 insead of 0
    }).then(function(newMediaIndex) {
      //newMediaIndex can be zero for a new playlist and it will be incremented to one
      if (!newMediaIndex && newMediaIndex !== 0) return callback(new Error('new mediaIndex not set'));
      return this.setCurrentMediaIndex(newMediaIndex);
    }).then(function(playlist) {
      if (!playlist) return callback(new Error('playlist not set'));
      console.log('incremented media index: ', playlist.get('current_media_index'));
      callback(null, playlist);
    })
    .catch(function(err) {callback(err);});
  }),

  setCurrentMediaIndex: Promise.promisify(function(currentMedia_ID, callback){
    return this.set('current_media_index', currentMedia_ID)
    .save().bind(this)
    .then(function(playlist) {
      if (!playlist) return callback(new Error('playlist for setting index not found'));
      callback(null, playlist);
    })
    .catch(function(err) {
      callback(err);
    });
  }),

  retrieveCurrentMedia: Promise.promisify(function(callback){
    var mediaIndex = this.get('current_media_index');
    if (mediaIndex === 0) return callback(null, 0); //send back 0 which indicates no playlist but not an error

    return this.medias().query({where: {media_order: mediaIndex}}).fetchOne()
    .then(function(found) {
      if (!found) return callback(new Error('media not found'));
      console.log('retrieved current media index: ', mediaIndex);
      callback(null,found);
    })
    .catch(function(error) {
      callback(error);
    });
  }),

  retrievePlaylist: Promise.promisify(function( callback ) {
    return this.fetch({
      withRelated: ['medias']
    })
    .then(function(playlist) {
      if (!playlist) return callback(new Error('playlist not found'));
      console.log('retrieved playlist');
      callback(null,playlist);
    })
    .catch(function(error) {
      callback(error);
    });
  }),

  setPlaylist: Promise.promisify(function( playlist, callback){
    this.medias();
  })
});

module.exports = Playlist;
