// Medias Collection

var MediasCollection = Backbone.Collection.extend({

  model: MediaModel,

  initialize: function (params) {
    // this.on("delete", function (media) {
    //   this.remove(media);
    // }.bind(this));
  }

});