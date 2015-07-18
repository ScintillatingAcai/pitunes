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
    this.currentMedia = 'temp'; //XXX fix this
    var onFire = function(){
      this.sockets.emit("media status", null);
    };
    var onComplete = function(){
      this.dequeueDJ();
      this.playMedia();
      this.sockets.emit("media status ended", null);
    };
    var timerIncrement = 3000;
    var mediaDuration = 3 * 60; //seconds XXX replace this with media duration (YOUTUBE?)
    this.mediaTimer = new Timer(onFire.bind(this),onComplete.bind(this),timerIncrement, mediaDuration);
    this.mediaTimer.start();
  },

  toJSON: function() {
    return _.extend((new db.Model()).toJSON.call(this), {
      users: this.users && this.users.toJSON(),
      djQueue: this.djQueue.length && this.djQueue.map(function(user) {user.toJSON();}),
      currentMedia: this.currentMedia && this.currentMedia.makeJSON(),
      mediaTimeElapsed: this.mediaTimeElapsed
    },this);
  },

  enqueueDJ: function(user_id) {
    var user = this.users.get(user_id);
    this.djQueue.push(user);
    if (this.djQueue.length === 1) {
      this.playMedia();
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

    this.djQueue.splice(queueIndex,1);
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
