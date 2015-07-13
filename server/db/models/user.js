var db = require('../schema');
var Promise = require('bluebird');
var bcrypt = Promise.promisifyAll(require('bcrypt'));

var User = db.Model.extend({
  tableName: 'Users',
  hasTimestamps: true,
  initialize: function(){
    this.on('creating', this.hashPassword);
  },
  
  comparePassword: function(attemptedPassword) {
    bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
      return isMatch;
    });
  },

  hashPassword: function(){
    bcrypt.genSalt(10, function(err, salt) {
      bcrypt.hash(this.get('password'), salt, function(err, hash) {
          // Store hash in your password DB.
          this.set('password', hash);
      });
    });
  }
});

module.exports = User;
