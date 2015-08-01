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

  getUser: function(user_id) {
    var singleton = require('../singleton.js');
    var user = singleton.users.get(user_id);
    return user;
  },

  getAllUsers: function() {
    console.log('retrieving all users');
    var singleton = require('../singleton.js');
    var allUsers = singleton.users;
    return allUsers;
  },

  addUser: function(user, callback) {
    var singleton = require('../singleton.js');
    singleton.users.add(user);
  },

  removeUser: function(user_id, callback) {
    var singleton = require('../singleton.js');
    singleton.users.remove(user_id);
  },

  //get a user from DB by ID
  retrieveUser: Promise.promisify(function(user_id, callback) {
    new User({
        id: user_id
      }).fetch()
      .then(function(found) {
        if (!found) return callback(new Error('user not found in db'));
        callback(null, found);
      })
      .catch(function(err) {
        callback(err, null);
      });
  }),

  //update a user in DB by ID
  updateUser: Promise.promisify(function(user_id, userInfo, callback) {
    new User({
        id: user_id
    }).fetch()
    .then(function(found) {
      if (!found) return callback(new Error('user not found in db'));
      return found;
    }).then(function(user) {
      user.set(userInfo);
      user.save()
      .then(function(updatedUser) {
        callback(null, updatedUser);
      })
      .catch(function(err) {
        callback(err, null);
      });
    })
    .catch(function(err) {
      callback(err, null);
    });
  }),

  //store a new user in DB
  storeUser: Promise.promisify(function(user, callback) {
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
            callback(null, newUser);
          })
          .catch(function(err) {
            callback(err);
          });
        }
      })
      .catch(function(err) {
        callback(err);
      });
  }),

  //check if user is in DB
  loginUser: Promise.promisify(function(user, callback) {
    var password = user.password;
    var email = user.email;

    new User({
        email: email
      }).fetch()
    .then(function(found) {
        if (found) {
          found.comparePassword(password, function(err, isMatch) {
            if (err) console.error('error: ', err);
            if (isMatch) {
              //do sessions
              return callback(null, found);
            } else {
              console.error('password incorrect');
              callback(new Error('Password Incorrect'));
            }
          });
        } else {
          console.error('user not found');
          callback(new Error('User not found'));
        }
      })
      .catch(function(error) {
        console.error('error:', error);
        callback(new Error('User not found'));
      });
  }),

  retrieveAllUserPlaylists: Promise.promisify(function(user_id, callback) {
    new User({
      id: user_id
    }).retrieveAllPlaylists(function(error, found){
      callback(null, found);
    });
  }),

  updateCurrentPlaylist: Promise.promisify( function(user_id, playlist_id, callback) {
    var user = this.getUser(user_id);

    if (user) {
      user.setCurrentPlaylist(playlist_id)
      .then(function(user){
        console.log("userUtils: ", user);
        callback(null, user);
      })
      .catch(function(error) {
        console.log('error:', error);
        callback(error);
      });
    }
    else {
      callback(new Error("User not found to update current playlist"));
    }
  }),

  updateLastPlaylistCurrent: Promise.promisify(function (user_id, callback) {
    var user = this.getUser(user_id);

    if ( user ) {
      user.playlists().query(function(qb){
        qb.orderBy('updated_at','DESC');
      }).fetchOne()
      .then(function (playlist) {
        var id = playlist.length > 0 ? playlist.get('id'): 0;

        user.set('current_playlist_id', playlist.get('id')).save()
        .then( function() {
          callback(null, {current_playlist_id: id});
        })
        .catch(function(error) {
          console.log('error:', error);
          callback(error);
        });
      })
      .catch(function(error) {
        console.log('error:', error);
        callback(error);
      });
    }
  })
};

require('../singleton.js');
