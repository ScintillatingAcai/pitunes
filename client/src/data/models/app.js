var Backbone = require('backbone');
var UserModel = require('./user.js');
var CurrentRoomModel = require('./currentRoom.js');

// App Model
var AppModel = Backbone.Model.extend({
  initialize: function () {
    this.set('user', new UserModel());
    this.set('current_room', new CurrentRoomModel());
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
  }
});

module.exports = AppModel;