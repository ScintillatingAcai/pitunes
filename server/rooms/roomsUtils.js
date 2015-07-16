var db = require('../db/schema');
var Rooms = require('../db/collections/rooms');
var Room = require('../db/models/room');

module.exports = {

  //get a room from DB by ID
  retrieveRoom: function(room_id, callback) {
    room_id = parseInt(room_id);

    new Room({
        id: room_id
      }).fetch({
        //add related data we would like to return in the withRelated array
        withRelated: [],
        require: true
      }).then(function(found) {
        if (found) {
          var roomWithJoins = found.attributes;

          // this is an example of how to add related data to the response object
          // roomWithJoins.events = [];
          // found.relations.events.forEach(function(item) {
          //    roomWithJoins.events.push(cleanAttributes(item.attributes));
          // });

          callback(null, roomWithJoins);
        } else {
          console.log('room_id not found:' + room_id);
        }
      })
      .catch(function(error) {
        console.log('error:', error);
      });
  },

  retrieveAllRooms: function(callback) {

    Rooms.reset().fetch().then(function(found) {
        if (found) {
          console.log('found:', found);
          var roomsWithJoins = found.models;

          // this is an example of how to add related data to the response object
          // roomWithJoins.events = [];
          // found.relations.events.forEach(function(item) {
          //    roomWithJoins.events.push(cleanAttributes(item.attributes));
          // });

          callback(null, roomsWithJoins);
        } else {
          console.log('rooms not found');
        }
      })
      .catch(function(error) {
        console.log('error:', error);
      });
  },

  //update a room in DB by ID
  updateRoom: function(room_id, roomInfo, callback) {
    room_id = parseInt(room_id);
    new Room({
        id: room_id
      }).fetch().then(function(found) {
        if (found) {
            found.set(roomInfo);
          found.save().then(function(updatedRoom) {
              callback(null, updatedRoom);
            })
            .catch(function(error) {
              console.log('error:', error);
            });
        } else {
          console.log('room_id not found:' + room_id);
        }
      })
      .catch(function(error) {
        console.log('error:', error);
      });
  },

  //store a new room in DB
  storeRoom: function(room, callback) {
    var roomname = room.name;

    new Room({
        name: name
      }).fetch().then(function(found) {

        if (found) {
          callback(null, found.attributes);
          console.log('room already found:', name);

        } else {

          var room = new Room({
            name: name,
          });

          room.save().then(function(newRoom) {
              Rooms.add(newRoom);
              callback(null, newRoom);
            })
            .catch(function(error) {
              console.log('error:', error);
            });
        }
      })
      .catch(function(error) {
        console.log('error:', error);
      });
  },

  //get a room from DB by ID
  addDJToQueue: function(dj_id, room_id, callback) {
    room_id = parseInt(room_id);
    dj_id = parseInt(dj_id);

    new Room({
        id: room_id
      }).fetch().then(function(found) {
        if (found) {
          room.queueDJ(dj_id);

          callback(null, roomWithJoins);
        } else {
          console.log('room_id not found:' + room_id);
        }
      })
      .catch(function(error) {
        console.log('error:', error);
      });
  },

};
