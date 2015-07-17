var db = require('../schema');
var User = require('../models/user');


var Users = db.Collection.extend({
  model: User
});

module.exports = Users;
