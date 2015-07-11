var url = require('url');
var utils = require('./roomsUtils');
var Promise = require('bluebird');

module.exports = {

  getRoom: function(req, res) {
    var room_ID = (url.parse(req.url).pathname).slice(1);
    console.log('retrieving info for room_id:' + room_ID);
    var R = Promise.promisify(utils.retrieveRoom);
    R(room_ID).then(function(room) {
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
    var room_ID = (url.parse(req.url).pathname).slice(1);
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
  }

};