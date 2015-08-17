var Backbone = require('backbone');
var UserModel = require('./user.js');
var CurrentRoomModel = require('./currentRoom.js');

var AppModel = Backbone.Model.extend({
  initialize: function () {
    this.set('user', new UserModel());
    this.set('current_room', new CurrentRoomModel());

    this.get('current_room').on('room status', function () {
      this.trigger('room status');
    }.bind(this));

    this.get('user').on('user status', function () {
      this.trigger('user status');
    }.bind(this));
  },
  userSignIn: function (res) {
    this.get('user').set(res);
    this.get('user').retrievePlaylists();
    this.trigger('userSignInOut');
  },
  userSignOut: function () {
    this.get('user').updateToDefaults();
    this.trigger('userSignInOut');
  },
  isSignedIn: function () {
    return (!!this.get('user').get('id'));
  },
  isEnqueued: function () {
    if (this.isSignedIn()) {
      var user_id = this.get('user').get('id');
      if (this.get('current_room').get('djQueue').get(user_id)) {
        //user is in djQueue
        return true;
      } else if (this.get('current_room').get('currentDJ').get('id') === user_id) {
        //user is currentDJ
        return true;
      }
    }
    return false;
  },
  setCurrentRoom: function (room_id) {
    if (room_id) {
      this.get('current_room').set('id', room_id);
      //this.get('current_room').retrieveCurrentRoomInfo();
    } else {
      this.get('current_room').updateToDefaults();
    }
  }
});

module.exports = AppModel;