// Playlist Controller

var populateUserPlaylist = function () {
  var source = 'http://' + document.domain + ':3000/api/users' + user.get('id') + '/playlists';
  var playlistsCollection =  new PlaylistsCollection();

  $.get(source, function (res) {
    res.forEach(function (playlist) {
      playlistsCollection.add(new PlaylistModel(playlist));
    });
  }).done(function () {
    user.set('playlists', playlistsCollection);
    var curPlaylistInd = user.get('current_playlist_id');
    user.set('playlist', playlistsCollection[curPlaylistInd]);
  }).fail(function () {
    console.log('GET request to ' + source + ' failed.');
  });
};