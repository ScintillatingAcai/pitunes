var db = require('../schema');
var Promise = require('bluebird');
var bcrypt = require('bcrypt');

var User = db.Model.extend({
  tableName: 'Users',
  hasTimestamps: true,

  initialize: function(){
    this.currentPlaylist = null;

    var that = this;
    this.on('creating', this.hashPassword);

    this.on('fetched', Promise.promisify(function(a, b, c, callback) {
      this.retrieveCurrentPlaylist(function(err, playlist) {
        that.currentPlaylist = playlist;
        // console.log('User (' + that.get('id') + ') FETCHED playlist: ', that.currentPlaylist);
        console.log(that.cid);
        callback();
      });
    }), this);
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

  getCurrentPlaylist:function() {
    return this.currentPlaylist;
  },

  setCurrentPlaylist:function(playlist_ID) {
    this.set('current_playlist_id', playlist_ID);

    this.save().then(function(playlist) {
      this.retrieveCurrentPlaylist(function(err, playlist) {
        this.currentPlaylist = playlist;

      }.bind(this));
    }.bind(this));
  },

  updateCurrentPlaylist: function(callback) {
    var hashPromise = Promise.promisify(this.retrieveCurrentPlaylist);
  },

  retrieveCurrentPlaylist: function(callback){
    var Playlist = require('./playlist');
    if (this.get('current_playlist_id') === 0) callback(null, null); //send back 0 which indicates no playlist but not an error
    // console.log('user attributes: ', this.attributes);
    console.log('retrieving current playlist for id: ', this.get('current_playlist_id'));
    return new Playlist().fetch({
      id:this.get('current_playlist_id')
    })
    .then(function(found) {
      if (!found) return callback(new Error('media playlist not found'));
      console.log('retrieved current playlist');
      callback(null,found);
    })
    .catch(function(error) {
      callback(error);
    });
  },

  //relationship
  playlists: function() {
    var Playlist = require('./playlist');
    return this.hasMany(Playlist, 'user_id');
  },

  retrieveAllPlaylists: function(callback) {
    this.playlists().fetch()
      .then( function(found) {
        if (!found) return callback(new Error('User playlists not found'));
        else {
          callback(null, found);
        }
      });
  }
});

module.exports = User;
