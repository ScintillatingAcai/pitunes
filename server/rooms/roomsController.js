var utils = require('./roomsUtils');

module.exports = {

  attachRoom: function(req, res, next, room_id) {
    console.log('attaching room_id: ', room_id);
    req.room_id = parseInt(room_id);
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

  getRoomsRouter: function( req, res) {
    var query = require('url').parse(req.url,true).query;
    if (query.top && (parseInt(query.top) > 0)) {
      module.exports.getTopRooms(req, res, parseInt(query.top));
    }
    else {
      module.exports.getAllRooms(req, res);
    }
  },

  getTopRooms: function(req, res, num) {
    var allRooms = utils.getAllRooms().toJSON()
    .sort(function (a,b) {
      return a.users.length < b.users.length;
    }).slice(0,num)
    .map(function(room) {

      var currentMedia = room.currentMedia ? room.currentMedia : null;
      currentMedia = currentMedia ?
          {
            id: currentMedia.id,
            youtube_id: currentMedia.youtube_id,
            title: currentMedia.title,
            img_url: currentMedia.img_url,
            duration: currentMedia.duration,
            play_count: currentMedia.play_count
          } : null;
      var currentDJ = room.currentDJ ? room.currentDJ : null;
      currentDJ = currentDJ ?
          {
            "id": currentDJ.id,
            "display_name": currentDJ.display_name,
            "icon": currentDJ.icon,
            "location": currentDJ.location,
          } : null;
      return {id: room.id,
        name: room.name,
        private: room.private,
        usersCount: room.users.length,
        queueCount: room.djQueue.length,
        currentDJ: currentDJ,
        currentMedia: currentMedia };
    });

    if (allRooms) {
      res.json(allRooms);
    } else {
      res.status(500).end();
    }
  },

  getAllRooms: function(req, res) {
    var allRooms = utils.getAllRooms().toJSON().map(function(room) {

      var currentMedia = room.currentMedia ? room.currentMedia : null;
      currentMedia = currentMedia ?
          {
            id: currentMedia.id,
            youtube_id: currentMedia.youtube_id,
            title: currentMedia.title,
            img_url: currentMedia.img_url,
            duration: currentMedia.duration,
            play_count: currentMedia.play_count
          } : null;
      var currentDJ = room.currentDJ ? room.currentDJ : null;
      currentDJ = currentDJ ?
          {
            "id": currentDJ.id,
            "display_name": currentDJ.display_name,
            "icon": currentDJ.icon,
            "location": currentDJ.location,
          } : null;
      return {id: room.id,
        name: room.name,
        private: room.private,
        usersCount: room.users.length,
        queueCount: room.djQueue.length,
        currentDJ: currentDJ,
        currentMedia: currentMedia };
    });

    if (allRooms) {
      res.json(allRooms);
    } else {
      res.status(500).end();
    }
  },

  addRoom: function(req, res, next) {
    console.log('adding room: ',req.body);
    utils.addRoom(req.body)
    .then(function(data) {
      if (data) {
        res.json(data.toJSON({omitPivot: true}));
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
      return next(new Error('controller error: ', error));
    });
  },

  updateRoom: function(req, res, next) {
    var roomInfo = req.body;

    console.log('updating room_id:', req.room_id, ' with info: ', roomInfo );
    utils.updateRoom(req.room_id, roomInfo)
    .then(function(room) {
      if (room) {
        res.json(room.toJSON({omitPivot: true}));
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
      return next(new Error('controller error: ', error));
    });
  }
};
