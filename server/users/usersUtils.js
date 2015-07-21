var db = require('../db/schema');
var Promise = require('bluebird');
var Users = require('../db/collections/users');
var User = require('../db/models/user');

//clean user data so we dont send passwords and attributes that start with underscore (private variables)
function cleanAttributes (attributes) {
  var result = {};
  for (var key in attributes) {
    if (key === 'password') {
    } else if (key.charAt(0) === '_') {
    } else {
      result[key] = attributes[key];
    }
  }
  return result;
}

module.exports = {

  //get a user from DB by ID
  retrieveUser: function(user_id, callback) {
    user_id = parseInt(user_id);
    console.log('retrieving user: ', user_id);

    new User({
        id: user_id
      }).fetch({
        //add related data we would like to return in the withRelated array
        withRelated: [],
        require: true
      }).then(function(found) {
        if (found) {

          // this is an example of how to add related data to the response object
          // userWithJoins.events = [];
          // found.relations.events.forEach(function(item) {
          //    userWithJoins.events.push(cleanAttributes(item.attributes));
          // });

          callback(null, found);
        } else {
          console.log('user_id not found:' + user_id);
        }
      })
      .catch(function(error) {
        console.log('retrieving user: ');

        console.log('error:', error);
      });
  },

  //update a user in DB by ID
  updateUser: function(user_id, userInfo, callback) {
    user_id = parseInt(user_id);
    new User({
        id: user_id
      }).fetch().then(function(found) {
        if (found) {
            found.set(userInfo);
          found.save().then(function(updatedUser) {
              callback(null, updatedUser);
            })
            .catch(function(error) {
              console.log('error:', error);
            });
        } else {
          console.log('user_id not found:' + user_id);
        }
      })
      .catch(function(error) {
        console.log('error:', error);
      });
  },

  //store a new user in DB
  storeUser: function(user, callback) {
    var display_name = user.displayName;
    var password = user.password;
    var email = user.email;

    new User({
        email: email
      }).fetch().then(function(found) {

        if (found) {
          callback(null, found.attributes);
          console.log('user already found:', username);

        } else {

          var user = new User({
            display_name: display_name,
            email: email,
            password: password
          })
          .save().then(function(newUser) {
              new Users().add(newUser);
              callback(null, newUser);
          })
          .catch(function(error) {
            console.log('error:', error);
          });
        }
      })
      .catch(function(error) {
        console.log('error:', error);
      });
  },

  //check if user is in DB
  loginUser: function(user, callback) {
    var password = user.password;
    var email = user.email;

    new User({
        email: email
      }).fetch().then(function(found) {

        if (found) {
          found.comparePassword(password, function(err, isMatch) {
            if (err) console.log('error: ', err);
            if (isMatch) {
              //do sessions
              console.log('user authenticated');
              callback(null, found.attributes);
            } else {
              console.log('password incorrect');
              callback(null, null);
            }
          });

        } else {

          console.log('user not found');
          callback(null,null);
        }
      })
      .catch(function(error) {
        console.log('error:', error);
      });
  },

  retrieveAllUserPlaylists: Promise.promisify(function(user_id, callback) {
    new User({
      id: user_id
    }).retrieveAllPlaylists(function(error, found){
      callback(null, found);
    });
  })

};
