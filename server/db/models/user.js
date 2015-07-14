var db = require('../schema');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

var User = db.Model.extend({
  tableName: 'Users',
  hasTimestamps: true,
  initialize: function(){
    this.on('creating', this.hashPassword);
  },

  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      if (err) callback(err);
      callback(null, isMatch);

    });
  },

  hashPassword: function(){
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(this.get('password'), salt, function(err, hash) {
          // Store hash in your password DB.
          this.set('password', hash);
      });
    });
  },

  getCurrentPlaylist: function(callback){
    var Playlist = require('./playlist');
    if (this.get('current_playlist_id') === null) callback(new Error('media has no current playlist'));

    return new Playlist().fetch({
      id:this.get('current_playlist_id')
    })
    .then(function(found) {
      if (found) {
        callback(null,found.attributes);
      } else {
        callback(new Error('media playlist not found'));
      }
    })
    .catch(function(error) {
      callback(error);
    });
  },

  playlists: function() {
    var Playlist = require('./playlist');
    return this.belongsToMany(Playlist,'Media_Playlists', 'media_id', 'playlist_id');
  }
});

module.exports = User;
