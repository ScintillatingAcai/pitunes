var db = require('../db/schema');
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

    new User({
        id: user_id
      }).fetch({
        //add related data we would like to return in the withRelated array
        withRelated: [],
        require: true
      }).then(function(found) {
        if (found) {
          var userWithJoins = cleanAttributes(found.attributes);

          // this is an example of how to add related data to the response object
          // userWithJoins.events = [];
          // found.relations.events.forEach(function(item) {
          //    userWithJoins.events.push(cleanAttributes(item.attributes));
          // });

          callback(null, userWithJoins);
        } else {
          console.log('user_id not found:' + user_id);
        }
      })
      .catch(function(error) {
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
    var username = user.username;
    var password = user.password;

    new User({
        username: username
      }).fetch().then(function(found) {

        if (found) {
          callback(null, found.attributes);
          console.log('user already found:', username);

        } else {

          var user = new User({
            username: username,
            password: password //update to use encryption
          });

          user.save().then(function(newUser) {
              Users.add(newUser);
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
    var username = user.username;
    var password = user.password;

    new User({
        username: username
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
        }
      })
      .catch(function(error) {
        console.log('error:', error);
      });
  },

  //start user session
  createSession: function(req, res, newUser) {
    return req.session.regenerate(function() {
      req.session.user = newUser;
      // res.redirect('/');
    });
  },

  //check if user is logged in, this doesn't do anything server side because we dont redirect from the backend
  isLoggedIn: function(req, res) {
    return req.session ? !!req.session.user : false;
  },


  checkUserSession: function(req, res, next) {
    if (!exports.isLoggedIn(req)) {
      // res.redirect('/login');
      console.error("Error: User not logged in");
    } else {
      next();
    }
  }
};
