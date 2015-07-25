var db = require('../db/schema');
var Promise = require('bluebird');
var Rooms = require('../db/collections/rooms');
var Room = require('../db/models/room');

var openSockets;

module.exports = {

  getRoom: function(room_id) {
    console.log('retrieving info for room: ' + room_id);
    var singleton = require('../singleton.js');
    var room = singleton.rooms.get(room_id);
    return room;
  },

  getAllRooms: function() {
    console.log('retrieving all rooms');
    var singleton = require('../singleton.js');
    var allRooms = singleton.rooms;
    return allRooms;
  },

  addRoom: Promise.promisify(function(room, callback) {
    var roomname = room.name;
    console.log('roomname: ', roomname);
    new Room({
        name: roomname
      }).fetch().then(function(found) {
        if (found) {
          callback(null, found);
          console.log('room already found:', name);
        } else {
          new Room({
            name: roomname
          }).save()
          .then(function(newRoom) {
            var singleton = require('../singleton.js');
            var allRooms = singleton.rooms;
            allRooms.add(newRoom);
            callback(null, newRoom);
          }).catch(function(err) {return callback(err);});
        }
      }).catch(function(err) {return callback(err);});
  }),

  //get a room from DB by ID
  retrieveRoom: Promise.promisify(function(room_id, callback) {
    room_id = parseInt(room_id);
    new Room({
        id: room_id
      }).fetch({
        //add related data we would like to return in the withRelated array
        withRelated: [],
        require: true
      }).then(function(found) {
        if (found) {
          // var roomWithJoins = found;

          // this is an example of how to add related data to the response object
          // roomWithJoins.events = [];
          // found.relations.events.forEach(function(item) {
          //    roomWithJoins.events.push(cleanAttributes(item.attributes));
          // });

          callback(null, found);
        } else {
          console.log('room_id not found:' + room_id);
        }
      }).catch(function(err) {return callback(err);});
  }),

  retrieveAllRooms: Promise.promisify(function(callback) {
    new Rooms().fetch()
    .then(function(found) {
        if (found) {
          console.log('found all rooms');
          // var roomsWithJoins = found;

          // this is an example of how to add related data to the response object
          // roomWithJoins.events = [];
          // found.relations.events.forEach(function(item) {
          //    roomWithJoins.events.push(cleanAttributes(item.attributes));
          // });

          callback(null, found);
        } else {
          console.log('rooms not found');
        }
      }).catch(function(err) {return callback(err);});
  }),

  //update a room in DB by ID
  updateRoom: Promise.promisify(function(room_id, roomInfo, callback) {
    new Room({
        id: room_id
      }).fetch().then(function(found) {
        if (found) {
            found.set(roomInfo).save()
            .then(function(updatedRoom) {
              callback(null, updatedRoom);
            })
            .catch(function(error) {
              console.log('error:', error);
            });
        } else {
          callback(new Error("No room found"));
        }
      }).catch(function(err) {
        return callback(err);
      });
  }),

  //store a new room in DB
  storeRoom: Promise.promisify(function(room, callback) {
    var roomname = room.name;

    new Room({
        name: name
      }).fetch().then(function(found) {
        if (found) {
          callback(null, found);
          console.log('room already found:', name);
        } else {
          var room = new Room({
            name: name,
          }).save().then(function(newRoom) {
              callback(null, newRoom);
            }).catch(function(err) {return callback(err);});
        }
      }).catch(function(err) {return callback(err);});
  }),

  //get a room from DB by ID
  addDJToQueue: Promise.promisify(function(dj_id, room_id, callback) {
    dj_id = parseInt(dj_id);

    console.log('adding DJ to queue ');

    new Room({
        id: room_id
      }).fetch().then(function(newRoom) {
        if (newRoom) {
          console.log('open sockets: ', openSockets);
          newRoom.setSocket(openSockets); //testing adding a socket this way
          newRoom.enqueueDJ(dj_id);

          callback(null, newRoom);
        } else {
          console.log('room_id not found:' + room_id);
        }
      }).catch(function(err) {return callback(err);});
  }),

  socketsForTimer: function(sockets) {
    console.log('setting sockets for timer');
    openSockets = sockets;
  }
};
