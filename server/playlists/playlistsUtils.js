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
    new Playlist({
        id: playlist_id,
      })
      .retrievePlaylist()
      // .fetch({
      //   //add related data we would like to return in the withRelated array
      //   withRelated: ['medias'],
      //   require: true
      // })
      .then(function(found) {
        if (found) {
          // var playlistWithJoins = cleanAttributes(found.attributes);

          // this is an example of how to add related data to the response object
          // playlistWithJoins.events = [];
          // found.relations.events.forEach(function(item) {
          //    playlistWithJoins.events.push(cleanAttributes(item.attributes));
          // });

          callback(null, found);
        } else {
          console.log('playlist_id not found:' + playlist_id);
          callback(new Error('Playlist not found'));
        }
      })
      .catch(function(error) {
        console.log('error:', error);
        callback(error);
      });
  }),

  //update a playlist in DB by ID
  updatePlaylist: Promise.promisify(function(playlist_id, playlistInfo, callback) {
    playlistMedias = playlistInfo.medias;

    new Playlist({id: playlist_id}).fetch()
      .then(function(found) {
        if (found) {
          found.set('name', playlistInfo.name).save()
          .then( function ( playlist ){
            new Media_Playlists().query({where: {playlist_id: found.id}}).fetch()
            .then(function (media_playlists) {
              return media_playlists.invokeThen('destroy');
            })
            .then( function ( empty_playlists ) {
            // check all the songs exists in the db
              return new Medias(playlistMedias).mapThen( function (media, index) {
                return media.fetch().then(function (exist) {
                  if (!exist) {
                    media.create().then(function( newMedia ) {  
                    return  new Media_Playlist({playlist_id: playlist_id, media_id: newMedia.get('id'), media_order: index+1}).save();
                    });
                  }
                  else {
                    return new Media_Playlist({playlist_id: playlist_id, media_id: media.get('id'), media_order: index+1}).save();
                  }
                });
              })
              .then(function ( medias ) {
                return new Playlist({id: playlist_id}).retrievePlaylist();
              })
              .then(function ( playlists ) {
                  callback(null, playlists);
              })
              .catch(function(error) {
                console.log('error:', error);
                callback(error);
              });
            })
            .catch(function(error) {
              console.log('error:', error);
              callback(error);
            });
          })
          .catch(function(error) {
            console.log('error:', error);
            callback(error);
          });  
        }
        else {
          console.log('playlist_id not found:' + playlist_id);
          callback(new Error("Playlist not found"));
        }
      })
      .catch(function(error) {
        console.log('error:', error);
        callback(error);
      });
  }),

  //store a new playlist in DB
  storePlaylist: Promise.promisify(function(user_id, playlist, callback) {
    var playlistName = playlist.name;
  
    new Playlist({
      name: playlistName,
      user_id: user_id
    }).save()
    .then(function(newPlaylist) {
      callback(null, newPlaylist);
    })
    .catch(function(error) {
      console.log('error:', error);
      callback(error);
    });
  })
};
