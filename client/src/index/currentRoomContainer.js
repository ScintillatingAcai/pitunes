// currentRoom.js

var source = 'http://' + document.domain + ':3000/api/rooms'
var roomsCollection =  new RoomsCollection();

$.get(source, function(res) {
  res.forEach(function(room) {
    roomsCollection.add(new RoomModel(room));
  });
})
  .fail(function() {
    console.log('error with GET request to ' + source);
  });