var url = require('url');
var utils = require('./roomsUtils');
var Promise = require('bluebird');

module.exports = {

  attachRoom: function(req, res, next, room_id) {
    console.log('attaching room_id: ', room_id);
    req.room_id = room_id;
    next();
  },

  getRoom: function(req, res) {
    var room_id = req.room_id;
    var room = utils.getRoom(room_id);

    if (room) {
      res.json(room);
    } else {
      res.status(500).end();
    }
  },

  getAllRooms: function(req, res) {
    var allRooms = utils.getAllRooms().toJSON().map(function(room) {

      var media = room.currentMedia ?
          {id: room.currentMedia.id, youtube_id: room.currentMedia.youtube_id} :
          null;
      return {id: room.id,
        name: room.name,
        private: room.private,
        usersCount: room.users.length,
        currentMedia: media };
    });

    if (allRooms) {
      res.json(allRooms);
    } else {
      res.status(500).end();
    }
  },

  addRoom: function(req, res) {
    console.log('adding room: ',req.body);
    var R = Promise.promisify(utils.addRoom);
    R(req.body).then(function(data) {
      if (data) {
        res.json(data);
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
    });
  },

  updateRoom: function(req, res) {
    var room_ID = req.room_id;
    var roomInfo = req.body;

    console.log('updating room_id:', room_ID, ' with info: ', roomInfo );
    var R = Promise.promisify(utils.updateRoom);
    R(room_ID,roomInfo).then(function(room) {
      if (room) {
        res.json(room);
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
    });
  },

  addDJToQueue: function(req, res) {
    var room_id = req.room.id;
    var room = req.room;

    var dj_id = req.body.id;
    var dj = req.body;

    var R = Promise.promisify(utils.addDJToQueue);
    R(dj_id,room_id).then(function(data) {
      if (data) {
        res.json(data);
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
    });
  }

};
