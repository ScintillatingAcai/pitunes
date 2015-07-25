// Media Model

var MediaModel = Backbone.Model.extend({
  defaults: {
    duration: null,
    img_url: null,
    title: null,
    youtube_id: null
  },

  toJSON: function() {
    var JSONObject = (new Backbone.Model()).toJSON.call(this);

    console.log(JSONObject);
    var cleanJSON = {};
    for (var key in JSONObject) {
        if (key.charAt(0) === '_') {

        } else if (key === 'created_at' || key === 'updated_at') {

        } else {
          cleanJSON[key] = JSONObject[key];
        }
    }
    console.log(cleanJSON);

    return cleanJSON;
  },
});

