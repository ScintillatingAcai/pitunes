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
    // this.on('change:id', function () {
    //   this.retrieveCurrentRoomInfo();
    // }.bind(this));
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

  updateForRoomStatus: function(json) {
    for (var key in json) {
      if (key === 'updated_at' || key === 'created_at' || key.charAt(0) === '_') {

      } else if (key === 'users') {
        var users = new UsersCollection(json.users);
        this.set('users', users);
      } else if (key === 'djQueue') {
        var djQueue = new UsersCollection(json.djQueue);
        this.set('djQueue', djQueue);
      } else if (key === 'currentMedia') {
        var currentMedia = new MediaModel(json.currentMedia);
        this.set('currentMedia', currentMedia);
      } else if (key === 'currentDJ') {
        var currentDJ = new UserModel(json.currentDJ);
        this.set('currentDJ', currentDJ);
      } else {
        this.set(key, json[key]);
      }
    }

  }
});