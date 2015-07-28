var Backbone = require('backbone');

var UserModel = require('../models/user.js');

// Users Collection
var UsersCollection = Backbone.Collection.extend({
  model: UserModel,

  initialize: function() {
  }
});

module.exports = UsersCollection;