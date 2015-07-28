var Backbone = require('backbone');

var SearchResultModel = Backbone.Model.extend({
  defaults: {
    duration: null,
    duration_display: null,
    img_url: null,
    title: null,
    youtube_id: null
  }
});

module.exports = SearchResultModel;