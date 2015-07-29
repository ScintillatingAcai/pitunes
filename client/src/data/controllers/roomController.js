//this adds all of the rooms into roomsCollection
var source = 'http://' + document.domain + ':3000/api/rooms'
var roomsCollection =  new RoomsCollection();

$.get(source, function(res) {
  res.forEach(function(room) {
    //check if there 'currentMedia' is null and if it's not, create a url property for the video thumbnail
    if (room.currentMedia === null) {
      //TODO: ADD A DEFAULT IMAGE FOR ROOMS THAT ARE NOT PLAYING MUSIC
      roomsCollection.add(new RoomModel(room));
    } else {
      room.videoURL = 'https://i.ytimg.com/vi/' + room.currentMedia + '/hqdefault.jpg';
      roomsCollection.add(new RoomModel(room));
    }
  });
})
  .fail(function() {
    console.log('error with GET request to ' + source);
  });

module.exports = roomsCollection;