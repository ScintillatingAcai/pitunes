var url = require('url');
var utils = require('./roomsUtils');
var Promise = require('bluebird');

module.exports = {

  attachRoom: function(req, res, next, room_id) {
    var R = Promise.promisify(utils.retrieveRoom);
    R(room_id).then(function(room) {
      if (!room) return next(new Error('no room found'));

      req.room = room;
      next();
    })
    .catch(function(err) {
      next(err);
    });
  },

  getRoom: function(req, res) {
    var room_ID = req.room.id;
    console.log('retrieving info for room_id:' + room_id);
    var R = Promise.promisify(utils.retrieveRoom);
    R(room_id).then(function(room) {
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

  addRoom: function(req, res) {
    console.log('adding room: ',req.body);
    var R = Promise.promisify(utils.storeRoom);
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
    var room_ID = req.room.id;
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