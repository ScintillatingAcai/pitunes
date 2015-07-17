var db = require('../schema');
var Timer = require('./timer');
var _ = require('lodash');

var Room = db.Model.extend({
  tableName: 'Rooms',
  hasTimestamps: true,

  users: null, //bookshelf Users collection
  djQueue: [], //array of bookshelf User models
  currentMedia: null, //bookshelf Media model
  mediaTimeElapsed:0,  //seconds elapsed on currentMedia
  mediaTimer: null,  //Timer object

  playMedia: function(media) {
    var timerFunction = function(){};
    var timerIncrement = 3000;
    var mediaDuration = 3 * 60; //seconds XXX replace this with media duration (YOUTUBE?)
    this.mediaTimer = new Timer(timerFunction,timerIncrement, mediaDuration);
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

  queueDJ: function(user_id) {
    var user = users.get(user_id);
    djQueue.push(user);
  },

  dequeueDJ: function() {
    return djQueue.shift();
  },

  removeDJFromQueue: function(user_id) {
    var popDJ;
    var queueIndex;

    djQueue.forEach(function(dj,index) {
      if (user_id === dj.get('id')) {
        popDJ = dj;
        queueIndex = index;
      }
    });

    djQueue.splice(queueIndex,1);
    return popDJ;
  },

  addUser: function(user) {
    Users.add(user);
  },

  removeUser: function(user_id) {
    var popUser = users.get(user_id);
    Users.remove(popUser);
    return popUser;
  }
});

module.exports = Room;
