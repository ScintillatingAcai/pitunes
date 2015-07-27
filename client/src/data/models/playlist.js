var Backbone = require('backbone');

var MediasCollection = require('../collections/medias.js');

// Playlist Model
var PlaylistModel = Backbone.Model.extend({
  defaults: {
    created_at: null,
    current_media_index: null,
    id: null,
    medias: new MediasCollection(),
    name: null,
    updated_at: null,
    user_id: null
  },
  initialize: function (params) {

  },
  toJSON: function() {
    var JSONObject = (new Backbone.Model()).toJSON.call(this);
    JSONObject.medias = this.get('medias') && this.get('medias').toJSON();

    //console.log(JSONObject);
    var cleanJSON = {};
    for (var key in JSONObject) {
      if (key.charAt(0) === '_') {

      } else if (key === 'created_at' || key === 'updated_at') {

      } else {
        cleanJSON[key] = JSONObject[key];
      }
    }
    //console.log('playlistJSON:', cleanJSON);


    return cleanJSON;
  },

});

module.exports = PlaylistModel;
