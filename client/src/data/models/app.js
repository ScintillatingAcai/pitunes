// App Model

var AppModel = Backbone.Model.extend({
  initialize: function () {
    this.set('user', new UserModel());
    this.set('current_room', new CurrentRoomModel());
  }
});