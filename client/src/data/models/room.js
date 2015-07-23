//A Backbone model for a room
var RoomModel = Backbone.Model.extend({
  defaults: {
    currentMedia: null,
    id: null,
    name: null,
    private: null,
    usersCount: null
  }
});