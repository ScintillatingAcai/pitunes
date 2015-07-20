var db = require('../schema');
var Timer = require('./timer');
var _ = require('lodash');
var $ = require('jquery');
var http = require('http');
var https = require('https');

var url = require('url');

var Users = require('../collections/users');

var YOUTUBE_API_KEY = '&key=AIzaSyA_ZnEUUw8uGbEdGfBXH296QX-1nnyeJnQ';

var Room = db.Model.extend({
  tableName: 'Rooms',
  hasTimestamps: true,

  initialize: function() {
    this.users = new Users(); //bookshelf Users collection
    this.djQueue = []; //array of bookshelf User models
    this.currentMedia = null; //bookshelf Media model
    this.mediaTimeElapsed = 0;  //seconds elapsed on currentMedia
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

    if (this.djQueue[0] && this.djQueue[0].getCurrentPlaylist()) {
      var dj = this.djQueue[0];
      var playlist = dj.getCurrentPlaylist();
      playlist.getCurrentMedia().bind(this).then(function(media) {
        this.currentMedia = media;
        this.currentMedia.incrementPlayCount().bind(this)
        .then(function(data) {
          console.log('incrementing media index');
          playlist.incrementCurrentMediaIndex();

          var videoId = this.currentMedia.get('youtube_id');
          var durationSearchUrl = 'https://www.googleapis.com/youtube/v3/videos?id=' + videoId + '&part=contentDetails' + YOUTUBE_API_KEY;
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
                that.sockets.in(that.get('id')).emit("media status", {
                  videoId: that.currentMedia.get('youtube_id'),
                  startSeconds:0,
                  status:'start'
                });
                that.mediaTimer = that.makeMediaTimer(3000, that.convertYTDuration(duration));
                that.mediaTimer.start();
            }).on('error', function(err) {
              console.error(err);
              this.playMedia();
            });
          });
        });
      });

    } else {
      console.log('stop media for no DJ');
      this.sockets.in(this.get('id')).emit("media status", {
        videoId: '',
        startSeconds:0,
        status:'stop'
      });
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
      this.sockets.in(this.get('id')).emit("media status", {
        videoId: this.currentMedia.get('youtube_id'),
        startSeconds:elapsedTime,
        status:'update'
      });
    };
    var onComplete = function(){
      // this.sockets.in(this.get('id')).emit("media status", {
      //   videoId: '',
      //   startSeconds:0,
      //   status:'stop'
      // });
      this.dequeueDJ();
      this.playMedia();
    };
    return new Timer(onFire.bind(this),onComplete.bind(this),increment, durationSecs);

  },

  toJSON: function() {
    return _.extend((new db.Model()).toJSON.call(this), {
      users: this.users && this.users.toJSON(),
      djQueue: this.djQueue.length && this.djQueue.map(function(user) {user.toJSON();}),
      currentMedia: this.currentMedia && this.currentMedia.toJSON(),
      mediaTimeElapsed: this.mediaTimeElapsed
    },this);
  },

  enqueueDJ: function(user_id, sockets) {
    this.sockets = sockets;
    var user = this.users.get(user_id);
    if (user) {
      this.djQueue.push(user);
      if (this.djQueue.length === 1) {
        this.playMedia();
      }
    }
  },

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

  addUser: function(user) {
    console.log('user to add: ', user.cid);
    if (this.users.indexOf(user) === -1) {
      this.users.add(user);
    }
  },

  removeUser: function(user_id) {
    var popUser = this.users.get(user_id);
    this.users.remove(popUser);

    return popUser;
  },

  getUser: function(user_id) {
    return this.users.get(user_id);
  }
});

module.exports = Room;
