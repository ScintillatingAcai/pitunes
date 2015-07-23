// Media Model

var MediaModel = Backbone.Model.extend({
  defaults: {
    _pivot_media_id: null,
    _pivot_playlist_id: null,
    created_at: null,
    duration: null,
    id: null,
    img_url: null,
    play_count: null,
    title: null,
    updated_at: null,
    youtube_id: null
  }
});

