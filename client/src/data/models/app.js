var Backbone = require('backbone');
var UserModel = require('./user.js');
var CurrentRoomModel = require('./currentRoom.js');

// App Model
var AppModel = Backbone.Model.extend({
  initialize: function () {
    this.set('user', new UserModel());
    this.set('current_room', new CurrentRoomModel());
  }
});

module.exports = AppModel;