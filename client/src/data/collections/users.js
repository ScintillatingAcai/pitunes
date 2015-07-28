var Backbone = require('backbone');

var UserModel = require('../models/user.js');

// Users Collection
var UsersCollection = Backbone.Collection.extend({
  model: UserModel
});

module.exports = UsersCollection;