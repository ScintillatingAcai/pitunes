var Backbone = require('backbone');
var $ = require('jquery');

var PlaylistsCollection = require('../collections/playlists.js');
var PlaylistModel = require('./playlist.js');
var MediasCollection = require('../collections/medias.js');

var UserModel = Backbone.Model.extend({
  defaults: {
    email: null,
    id: 0,
    password: null,
    oath: null,
    display_name: "Anonymous" + Math.floor(Math.random() * 10000),
    icon: null,
    location: null,
    playlists: new PlaylistsCollection(),
    current_playlist_id: 0,
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
      if (context.get('current_playlist_id') !== 0) {
        context.set('current_playlist', playlistsCollection.get(context.get('current_playlist_id')));
      } else {
        context.set('current_playlist', new PlaylistModel());
      }
      context.trigger('user status');
    }).fail(function () {
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
  retrieveCurrentPlaylist: function () {
    if (this.get('id')) {
      // console.log('playlist id: ', this.get('current_playlist_id'));
      this.retrievePlaylist(this.get('current_playlist_id'), function (err, playlist) {
        if (err || !playlist) {
          this.set('current_playlist', new PlaylistModel());
          this.trigger('user status');
        }
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
