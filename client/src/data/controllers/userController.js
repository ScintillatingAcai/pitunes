// User Controller

var source = 'http://' + document.domain + ':3000/api/users' + user.get('id');
var playlistsCollection =  new PlaylistsCollection();

$.get(source, function (res) {
  res.forEach(function (playlist) {
    playlistsCollection.add(new PlaylistModel(playlist));
  });
}).done(function () {
  user.set('playlists', playlistsCollection);
}).fail(function () {
  console.log('GET request to ' + source + ' failed.');
});