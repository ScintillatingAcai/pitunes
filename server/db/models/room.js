var db = require('../schema');
var Timer = require('./timer');
var _ = require('lodash');
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
    this.djQueue = []; //array of bookshelf User models
    this.currentMedia = null; //bookshelf Media model
    this.mediaTimer = null;  //Timer object
    this.sockets = null;
  },

  setSocket: function(socket) {
    this.sockets = socket;
  },

  playMedia: function() {
    if (this.mediaTimer) {
      this.mediaTimer.stop();
      this.mediaTimer = null;
    }

    if (this.djQueue[0]) {
      var dj = this.djQueue[0];
      var playlist = dj.getCurrentPlaylist().bind(this)
      .then(function(playlist) {
        playlist.getCurrentMedia().bind(this)
        .then(function(media) {
          this.currentMedia = media;
          this.currentMedia.incrementPlayCount().bind(this)
          .then(function(data) {
            playlist.incrementCurrentMediaIndex();

            var videoId = this.currentMedia.get('youtube_id');
            var durationSearchUrl = 'https://www.googleapis.com/youtube/v3/videos?id=' + videoId + '&part=contentDetails&key=' + YOUTUBE_API_KEY;
            var link = url.parse(durationSearchUrl);
            var options = {
                host: link.hostname,
                port: link.port,
                path: link.path
            };
            var that = this;
            https.get(options, function(res) {
              var response = '';
              res.on('data', function(data) {
                  // collect the data chunks to the variable named "html"
                  response += data;
              }).on('end', function() {
                  // the whole of webpage data has been collected. parsing time!
                  var duration = JSON.parse(response).items[0].contentDetails.duration;
                  console.log('duration received from youtube: ', duration);
                  that.emitMediaStatusMessage(that.sockets.in(that.get('id')), that.currentMedia, 0, 'start');
                  that.mediaTimer = that.makeMediaTimer(3000, that.convertYTDuration(duration));
                  that.mediaTimer.start();
              }).on('error', function(err) {
                console.error(err);
                this.playMedia();
              });
            });
          });
        });
      });
    } else {
      console.log('stop media for no DJ');
      this.emitMediaStatusMessage(this.sockets.in(this.get('id')), null, 0, 'stop');
    }
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

  convertYTDuration: function (duration) {
    var a = duration.match(/\d+/g);
    if (duration.indexOf('M') >= 0 && duration.indexOf('H') === -1 && duration.indexOf('S') === -1) {
      a = [0, a[0], 0];
    }
    if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1) {
      a = [a[0], 0, a[1]];
    }
    if (duration.indexOf('H') >= 0 && duration.indexOf('M') === -1 && duration.indexOf('S') === -1) {
      a = [a[0], 0, 0];
    }
    duration = 0;
    if (a.length === 3) {
      duration = duration + parseInt(a[0]) * 3600;
      duration = duration + parseInt(a[1]) * 60;
      duration = duration + parseInt(a[2]);
    }
    if (a.length === 2) {
      duration = duration + parseInt(a[0]) * 60;
      duration = duration + parseInt(a[1]);
    }
    if (a.length === 1) {
      duration = duration + parseInt(a[0]);
    }
    return duration;
  },

  makeMediaTimer: function(increment, durationSecs) {
    var onFire = function(elapsedTime){
      this.emitMediaStatusMessage(this.sockets, this.currentMedia, elapsedTime, 'update');
    };
    var onComplete = function(){
      this.dequeueDJ();
      this.playMedia();
    };
    return new Timer(onFire.bind(this),onComplete.bind(this),increment, durationSecs);
  },

  toJSON: function() {
    return _.extend((new db.Model()).toJSON.call(this), {
      users: this.users && this.users.toJSON(),
      djQueue: this.djQueue.length && this.djQueue.map(function(user) {user.toJSON();}),
      currentMedia: this.currentMedia && this.currentMedia.toJSON()
    },this);
  },

  enqueueDJ: Promise.promisify(function(user_id, sockets, callback) {
    this.sockets = sockets;
    var user = this.users.get(user_id);
    if (user && this.djQueue.indexOf(user) === -1) {
      user.getCurrentPlaylist().then(function(playlist) {
        if (!playlist) return callback(new Error('user has no current playlist, cannot enter queue'));
        this.djQueue.push(user);
        if (this.djQueue.length === 1) {
          this.playMedia();
        }
        return callback(null, user);
      })
      .catch(function(err) {
        callback(err);
      });
    }
    callback(null, null);
  }),

  dequeueDJ: function() {
    this.djQueue.push(this.djQueue.shift());
  },

  removeDJFromQueue: function(user_id) {
    var popDJ;
    var queueIndex;

    for (var i = 0; i < this.djQueue.length; i++) {
      var dj = this.djQueue[i];
      if (user_id === dj.get('id')) {
        popDJ = dj;
        queueIndex = i;
        break;
      }
    }

    if (queueIndex !== undefined) {
      this.djQueue.splice(queueIndex,1);
    }
    console.log('removed DJ index: ', queueIndex);

    if (queueIndex === 0) {
      this.playMedia();
    }

    return popDJ;
  },

  addUser: Promise.promisify(function(user, callback) {
    //dont need to worry about user already being in collection because there can only be one
    if (!this.users.get(user.id)) {
      this.users.add(user);
      callback(null, user);
    } else {
      callback(null, null);
    }
  }),

  removeUser: Promise.promisify(function(user_id, callback) {
    var popUser = this.users.get(user_id);
    this.users.remove(popUser);

    callback(null, popUser);
  }),

  getUser: Promise.promisify(function(user_id, callback) {
    callback(null, this.users.get(user_id));
  })
});

module.exports = Room;
