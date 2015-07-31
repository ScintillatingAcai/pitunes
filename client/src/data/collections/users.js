var Backbone = require('backbone');
var UserModel = require('../models/user.js');

var UsersCollection = Backbone.Collection.extend({
  model: UserModel,
});

module.exports = UsersCollection;