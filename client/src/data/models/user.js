var Backbone = require('backbone');
var $ = require('jquery');

var PlaylistsCollection = require('../collections/playlists.js');
var PlaylistModel = require('./playlist.js');
var MediasCollection = require('../collections/medias.js');


//A Backbone model for the user who is logged in
var UserModel = Backbone.Model.extend({
  defaults: {
    email: null,
    id: 0,
    password: null,
    oath: null,
    display_name: "Anonymous" + Math.floor(Math.random() * 1000),
    icon: null,
    location: null,
    playlists: new PlaylistsCollection(),
    current_playlist_id: null,
    current_playlist: new PlaylistModel(),
    created_at: null,
    updated_at: null
  },
  retrievePlaylists: function () {
    var source =  window.location.origin + '/api/users/' + this.get('id') + '/playlists';
    var playlistsCollection =  new PlaylistsCollection();
    var context = this;
    $.get(source, function (res) {
      res.forEach(function (jsonPlaylist) {
        var playlist = new PlaylistModel();
        for (var key in jsonPlaylist) {
          if (key === 'medias') {
            var medias = new MediasCollection(jsonPlaylist.medias);
            playlist.set('medias', medias);
          } else {
            playlist.set(key, jsonPlaylist[key]);
          }
        }
        playlistsCollection.add(playlist);
      });
    }).done(function () {
      context.set('playlists', playlistsCollection);
      var curPlaylistInd = context.get('current_playlist_id');
      if (curPlaylistInd !== 0) {
        context.set('current_playlist', playlistsCollection.get(curPlaylistInd));
      } else {
        context.set('current_playlist', new PlaylistModel());
      }
      context.trigger('user status');
    }).fail(function () {
      console.log('GET request to ' + source + ' failed.');
      context.trigger('user status');
    });
  },
  retrievePlaylist: function (playlist_id, callback) {
    var source =  window.location.origin + '/api/users/' + this.get('id') + '/playlists/' + playlist_id;
    var context = this;
    $.get(source, function (res) {
        if (!res) return callback(new Error('no playlist returned'));
        var playlist = new PlaylistModel();
        for (var key in res) {
          if (key === 'medias') {
            var medias = new MediasCollection(res.medias);
            playlist.set('medias', medias);
          } else {
            playlist.set(key, res[key]);
          }
        }
        callback(null, playlist);
    })
    .done(function () {
    })
    .fail(function () {
      console.log('GET request to ' + source + ' failed.');
      callback(new Error('playlist get request failed'));
    });
  },
  updateForUserStatus: function () {
    if (this.get('id')) {
      this.retrievePlaylist(this.get('current_playlist_id'), function (err, playlist) {
        if (err) return console.error(err);
        this.set('current_playlist', playlist);
        this.trigger('user status');
      }.bind(this));
    }
  },
  updateToDefaults: function () {
    this.set(this.defaults);
  }


});

module.exports = UserModel;
