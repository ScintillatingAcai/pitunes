var db = require('../db/schema');
var Promise = require('bluebird');
var Playlists = require('../db/collections/playlists');
var Playlist = require('../db/models/playlist');
var Medias = require('../db/collections/medias');
var Media = require('../db/models/media');
var Media_Playlists = require('../db/collections/media_playlists');
var Media_Playlist = require('../db/models/media_playlist');

module.exports = {

  //get a playlist from DB by ID
  retrievePlaylist: Promise.promisify(function(playlist_id, callback) {
    console.log('retrieving playlist id: ', playlist_id);
    new Playlist({id: playlist_id })
    .retrievePlaylist().then(function(found) {
      if (found) {
        callback(null, found);
      } else {
        console.log('playlist_id not found:' + playlist_id);
        callback(new Error('Playlist not found'));
      }
    }).catch(function(err) {callback(err);});
  }),

  //update a playlist in DB by ID
  updatePlaylist: Promise.promisify(function(playlist_id, playlistInfo, callback) {
    playlistMedias = playlistInfo.medias;

    new Playlist({id: playlist_id}).fetch().then(function(found) {
      if (found) {
        found.set('name', playlistInfo.name);
        if (playlistInfo.current_media_index) {
          found.set('current_media_index', playlistInfo.current_media_index);
          console.log('current media index set to: ', found.get('current_media_index'));
        }
        found.save().then(function(playlist){
          new Media_Playlists().query({where: {playlist_id: found.id}}).fetch().then(function(media_playlists) {
            return media_playlists.invokeThen('destroy');
          }).then(function(empty_playlists) {
          // check all the songs exists in the db
            return new Medias(playlistMedias).mapThen(function(media, index) {
              return media.fetch().then(function(exist) {
                if (!exist) {
                  media.save().then(function(newMedia) {
                    return new Media_Playlist({playlist_id: playlist_id, media_id: newMedia.get('id'), media_order: index+1}).save();
                  });
                }
                else {
                  return new Media_Playlist({playlist_id: playlist_id, media_id: media.get('id'), media_order: index+1}).save();
                }
              });
            }).then(function(medias) {
              return new Playlist({id: playlist_id}).retrievePlaylist();
            }).then(function(playlists) {
              callback(null, playlists);
            }).catch(function(error) {callback(err);});
          }).catch(function(err) {callback(err);});
        }).catch(function(err) {callback(err);});
      }
      else {
        console.log('playlist_id not found:' + playlist_id);
        callback(new Error("Playlist not found"));
      }
    }).catch(function(err) {callback(err);});
  }),

  //store a new playlist in DB
  storePlaylist: Promise.promisify(function(user_id, playlist, callback) {
    var playlistName = playlist.name;
    new Playlist({
      name: playlistName,
      user_id: user_id
    }).save().then(function(newPlaylist) {
      if (!newPlaylist) return callback(new Error('no new playlist'));
      var singleton = require('../singleton.js');
      var user = singleton.users.get(user_id);
      if (!user) return callback(new Error('Check 1: no user found in new playlist'));
      return user.setCurrentPlaylist(newPlaylist.get('id')).then(function(user) {
        if (!user) return callback(new Error('Check 2: no user found in new playlist'));
        callback(null, newPlaylist);
      }).catch(function(err) {callback(err);});
    })
    .then(function(user) {
      if (!user) return callback(new Error('check 3: no user found in new playlist'));
      callback(null, newPlaylist);
    }).catch(function(err) {callback(err);});
  }),

  deletePlaylist: Promise.promisify(function(playlist_id, callback) {
    new Media_Playlists().query({where: {playlist_id: playlist_id}}).fetch().then(function(playlist) {
      return playlist.invokeThen('destroy');
    }).then(function(){
      return new Playlist({id: playlist_id}).destroy();
    }).then( function () {
      callback();
    }).catch(function(err) {callback(err);});
  })
};
