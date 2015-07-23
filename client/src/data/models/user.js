//A Backbone model for the user who is logged in
var UserModel = Backbone.Model.extend({
  defaults: {
    email: null,
    id: null,
    password: null,
    oath: null,
    display_name; null,
    icon: null,
    location: null,
    current_playlist_id: null,
    created_at: null,
    updated_at: null
  }
});