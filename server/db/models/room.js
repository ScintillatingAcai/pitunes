var db = require('../schema');
var Timer = require('./timer');
var _ = require('lodash');

var Users = require('../collections/users');

var Room = db.Model.extend({
  tableName: 'Rooms',
  hasTimestamps: true,

  users: new Users(), //bookshelf Users collection
  djQueue: [], //array of bookshelf User models
  currentMedia: null, //bookshelf Media model
  mediaTimeElapsed:0,  //seconds elapsed on currentMedia
  mediaTimer: null,  //Timer object
  sockets: null,

  setSocket: function(socket) {
    this.sockets = socket;
  },

  playMedia: function() {
    if (this.djQueue[0] /*&& this.djQueue[0].getCurrentPlaylist()*/) {
      console.log('play media for DJ: ',this.djQueue[0].get('id'));
      this.currentMedia = this.djQueue[0].getCurrentPlaylist(); //XXX fix this
      var onFire = function(elapsedTime){
        this.sockets.emit("media status", {
          videoId: '2HQaBWziYvY',
          startSeconds:elapsedTime
        });
      };
      var onComplete = function(){
        this.dequeueDJ();
        this.playMedia();
        this.sockets.in(this.get('id')).emit("media status ended", null);
      };
      var timerIncrement = 3000;
      var mediaDuration = 3 * 60; //seconds XXX replace this with media duration (YOUTUBE?)
      this.mediaTimer = new Timer(onFire.bind(this),onComplete.bind(this),timerIncrement, mediaDuration);
      this.mediaTimer.start();
    } else {
      console.log('stop media for no DJ');

      this.mediaTimer.stop();
      this.mediaTimer = null;
      this.sockets.in(this.get('id')).emit("media status", {
        videoId: '',
        startSeconds:0
      });
    }
  },

  toJSON: function() {
    return _.extend((new db.Model()).toJSON.call(this), {
      users: this.users && this.users.toJSON(),
      djQueue: this.djQueue.length && this.djQueue.map(function(user) {user.toJSON();}),
      currentMedia: this.currentMedia && this.currentMedia.makeJSON(),
      mediaTimeElapsed: this.mediaTimeElapsed
    },this);
  },

  enqueueDJ: function(user_id, sockets) {
    this.sockets = sockets;
    var user = this.users.get(user_id);

    if (this.djQueue.indexOf(user) === -1) {
      this.djQueue.push(user);
      if (this.djQueue.length === 1) {
        console.log('asdfa')
        this.playMedia();
      }
    }
  },

  dequeueDJ: function() {
    return this.djQueue.shift();
  },

  removeDJFromQueue: function(user_id) {
    var popDJ;
    var queueIndex;

    this.djQueue.forEach(function(dj,index) {
      if (user_id === dj.get('id')) {
        popDJ = dj;
        queueIndex = index;
      }
    });

    if (queueIndex !== undefined) {
      this.djQueue.splice(queueIndex,1);
    }

    if (queueIndex === 0) {
        this.playMedia();
    }
    return popDJ;
  },

  addUser: function(user) {
    this.users.add(user);
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
