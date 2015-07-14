var db = require('../schema');
var Promise = require('bluebird');
var bcrypt = require('bcrypt');

var User = db.Model.extend({
  tableName: 'Users',
  hasTimestamps: true,
  initialize: function(){
    this.on('creating', this.hashPassword);
  },

  comparePassword: function(attemptedPassword, callback) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      callback(err, isMatch);
    });
  },

  hashPassword: function(callback){
    var hashPromise = Promise.promisify(bcrypt.hash);
    return hashPromise(this.get('password'), 10).bind(this)
    .then(function(hash) {
      return this.set('password', hash);
    })
    .catch(function(err) {
      console.error('hashing error:', err);
    });
  },

  getCurrentPlaylist: function(callback){
    var Playlist = require('./playlist');
    if (this.get('current_playlist_id') === 0) callback(null, 0); //send back 0 which indicates no playlist but not an error

    return new Playlist().fetch({
      id:this.get('current_playlist_id')
    })
    .then(function(found) {
      if (!found) return callback(new Error('media playlist not found'));
      callback(null,found.attributes);
    })
    .catch(function(error) {
      callback(error);
    });
  },

  playlists: function() {
    var Playlist = require('./playlist');
    return this.hasMany(Playlist, 'user_id');
  }
});

module.exports = User;
