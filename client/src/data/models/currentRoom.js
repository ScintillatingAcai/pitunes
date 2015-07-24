// Current Room Model

var CurrentRoomModel = Backbone.Model.extend({
  defaults: {
    currentMedia: null,
    id: null,
    name: null,
    private: null,
    users: new UsersCollection(),
    djQueue: new UsersCollection()
  },

  initialize: function () {
    this.on('change:id', function () {
      this.retrieveCurrentRoomInfo();
    }.bind(this));
  },

  retrieveCurrentRoomInfo: function () {
    var source = 'http://' + document.domain + ':3000/api/rooms/' + this.get('id');
    var context = this;
    $.get(source, function (res) {
      for (var key in res) {
        if (key === 'users') {
          //var users = new UsersCollection(res.users);
         // context.set('users', users);
        } else if (key === 'djQueue') {
          var djQueue = new UsersCollection(res.djQueue);
          context.set('djQueue', djQueue);
        } else if (key === 'currentMedia') {
          var currentMedia = new MediaModel(res.currentMedia);
          context.set('currentMedia', currentMedia);
        } else if (key === 'currentDJ') {
          var currentDJ = new UserModel(res.currentDJ);
          context.set('currentDJ', currentDJ);
        } else {
          context.set(key, res[key]);
        }
      }
    }).done(function () {
      console.log('Room Loaded');
    }).fail(function () {
      console.log('GET request to ' + source + ' failed.');
    });
  },
});