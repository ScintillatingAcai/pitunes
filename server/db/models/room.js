var db = require('../schema');
var Timer = require('./timer');
var http = require('http');
var https = require('https');

var Promise = require('bluebird');

var url = require('url');

var Users = require('../collections/users');

var YOUTUBE_API_KEY = 'AIzaSyA_ZnEUUw8uGbEdGfBXH296QX-1nnyeJnQ';

var Room = db.Model.extend({
  tableName: 'Rooms',
  hasTimestamps: true,

  initialize: function() {
    this.users = new Users(); //bookshelf Users collection
    this.djQueue = new Users(); //bookshelf Users collection in order
    this.currentMedia = null; //bookshelf Media model
    this.currentDJ = null; //bookshelf Media model
    this.mediaTimer = null;  //Timer object
    this.sockets = null;
    this.lastRoomStatus = null;
  },

  setSocket: function(socket) {
    console.log('setting socket for room: ', this.get('id'));
    this.sockets = socket;
  },

  playMedia: function() {

    if (this.mediaTimer) {
      this.mediaTimer.stop();
      this.mediaTimer = null;
    }
    this.currentDJ = this.dequeueDJ();
    if (this.currentDJ) {
      console.log('current dj: ', this.currentDJ.get('display_name'));
      this.currentDJ.getCurrentPlaylist().bind(this)
      .then(function(playlist) {
          return playlist.incrementCurrentMediaIndex().bind(this);
      })
      .then(function(playlist) {
        return playlist.getCurrentMedia().bind(this);
      })
      .then(function(media) {
        this.currentMedia = media;
        return this.currentMedia.incrementPlayCount().bind(this);
      })
      .then(function(data) {
          var duration = this.currentMedia.get('duration');
          this.emitMediaStatusMessage(this.sockets.in(this.get('id')), this.currentMedia, 0, 'start');
          this.mediaTimer = this.makeMediaTimer(3000, duration);
          this.mediaTimer.start();
          this.emitRoomStatusMessage(this.sockets.in(this.get('id')));
          this.emitUserStatusMessage(this.sockets.in(this.get('id')), this.currentDJ.get('id'));
      }).catch(function(err) {
        console.error(err);
        console.log('skipping to next queuedDJ');
        this.playMedia();
      });
    } else {
      console.log('stop media for no DJ');
      this.emitMediaStatusMessage(this.sockets.in(this.get('id')), null, 0, 'stop');
      this.emitRoomStatusMessage(this.sockets.in(this.get('id')));
    }
  },

  emitRoomStatusMessage: function(socket, allAttributes) {
    var roomJSON = this.toJSON();

    if (allAttributes) {
      socket.emit("room status", roomJSON);
      this.lastRoomStatus = roomJSON;
      return;
    }

    // this sends incremental changes
    var result = {};
    var usefulKeyCount = 0;
    for (var key in roomJSON) {
      var attr = roomJSON[key];
      var oldAttr = this.lastRoomStatus ? this.lastRoomStatus[key] : {};

      //always send room id since client may check it
      if (key === 'id') {
        result[key] = attr;
      }
      else if (JSON.stringify(attr) !== JSON.stringify(oldAttr)) {
        result[key] = attr;
        usefulKeyCount++;
      }
    }
    this.lastRoomStatus = roomJSON;

    //only send room status if something has changed
    if (usefulKeyCount > 0) {
      socket.emit("room status", result);
    }
  },

  emitUserStatusMessage: function(socket, user_id) {
    //socket.emit("user status", this.currentDJ.toJSON());
    //only sending the id since the client currently just checks it and pulls their playlists
    socket.emit("user status", {id: user_id, room: this.get('id')});
  },

  emitMediaStatusMessage: function(socket, media, mediaDuration, statusMessage) {
    socket.emit("media status", {
      videoId: media && media.get('youtube_id'),
      startSeconds:mediaDuration,
      status:statusMessage
    });
  },

  startUserForCurrentMedia:function(socket) {
    if (this.currentMedia && this.mediaTimer) {
      var duration = (new Date() - this.mediaTimer.startDate) / 1000;
      this.emitMediaStatusMessage(socket, this.currentMedia, duration, 'start');
    }
  },

  makeMediaTimer: function(increment, durationSecs) {
    var onFire = function(elapsedTime){
      this.emitMediaStatusMessage(this.sockets.in(this.get('id')), this.currentMedia, elapsedTime, 'update');
    };
    var onComplete = function(){
      this.djQueue.push(this.currentDJ);
      this.playMedia();
    };
    return new Timer(onFire.bind(this),onComplete.bind(this),increment, durationSecs);
  },

  toJSON: function() {
    var JSONObject = (new db.Model()).toJSON.call(this);
    JSONObject.users = this.users ? this.users.toJSON() : null;
    JSONObject.djQueue = this.djQueue ? this.djQueue.toJSON() : null;
    JSONObject.currentMedia = this.currentMedia ? this.currentMedia.toJSON() : null;
    JSONObject.currentDJ = this.currentDJ ? this.currentDJ.toJSON() : null;
    return JSONObject;
  },

  enqueueDJ: Promise.promisify(function(user_id, callback) {
    var user = this.users.get(user_id);
    if (!user) return callback(new Error('user not in room'));
    if (this.djQueue.get(user_id)) return callback(new Error('user already in queue'));
    user.getCurrentPlaylist().bind(this).then(function(playlist) {
      if (!playlist) return callback(new Error('user has no current playlist, cannot enter queue'));
      return playlist.medias().fetch().bind(this);
    })
    .then(function (medias) {
      if (!medias || medias.length === 0) return callback(new Error('playlist has no medias'));
      // var insertDJIndex = Math.max(this.djQueue.length - 1, 0);
      // this.djQueue.add(user,{at: insertDJIndex});
      this.djQueue.push(user);
      if (this.currentMedia === null) {
        this.playMedia();
      }
      this.emitRoomStatusMessage(this.sockets.in(this.get('id')));
      return callback(null, user);
    }).catch(function(err) {return callback(err);});
  }),

  dequeueDJ: function() {
    var dj = this.djQueue.shift();
    // this.djQueue.push(dj);
    return dj;
  },

  removeDJFromQueue: function(user_id) {
    var popDJ = this.users.get(user_id);
    var queueIndex;

    for (var i = 0; i < this.djQueue.length; i++) {
      var dj = this.djQueue.at(i);
      if (user_id === dj.get('id')) {
        popDJ = dj;
        queueIndex = i;
        break;
      }
    }

    if (queueIndex !== undefined) {
      this.djQueue.remove(popDJ);
    }
    console.log('removed DJ index: ', queueIndex);

    if (this.currentDJ === popDJ) {
      console.log('dj was playing when dequeued so stopping song');
      this.currentDJ = null;
      this.currentMedia = null;
      this.playMedia();
    }

    this.emitRoomStatusMessage(this.sockets.in(this.get('id')));

    return popDJ;
  },

  addUser: Promise.promisify(function(user, callback) {
    //dont need to worry about user already being in collection because there can only be one
    if (!this.users.get(user.id)) {
      this.users.add(user);
      callback(null, user);
      this.emitRoomStatusMessage(this.sockets.in(this.get('id')));
    } else {
      if (callback) {
       callback(null, null);
      }
      this.emitRoomStatusMessage(this.sockets.in(this.get('id')));
    }
  }),

  removeUser: Promise.promisify(function(user_id, callback) {
    var popUser = this.users.get(user_id);
    this.users.remove(popUser);
    if (callback) {
      callback(null, popUser);
    }
    this.emitRoomStatusMessage(this.sockets.in(this.get('id')));
  }),

  getUser: Promise.promisify(function(user_id, callback) {
    callback(null, this.users.get(user_id));
  })
});

module.exports = Room;
