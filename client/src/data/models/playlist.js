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
  }
});

