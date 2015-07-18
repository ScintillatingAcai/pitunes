var db = require('../schema');

var Playlist = db.Model.extend({
  tableName: 'Playlists',
  hasTimestamps: true,

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

  setCurrentMedia: function( currentMedia_ID ){
    this.set('current_media_index', currentMedia_ID);
    this.save().then(function(currentMedia) {
      this.retrieveCurrentPlaylist(function(err, currentMedia) {
        this.currentMedia = currentMedia;
      }.bind(this));
    });
  },

  retrieveCurrentMedia: function(callback){
    var Media = require('./media');
    if (this.get('current_media_index') === 0) callback(null, null); //send back 0 which indicates no playlist but not an error

    new Media().fetch({
      id:this.get('current_playlist_id')
    })
    .then(function(found) {
      if (!found) return callback(new Error('media not found'));
      callback(null,found.attributes);
    })
    .catch(function(error) {
      callback(error);
    });
  },
});

module.exports = Playlist;
