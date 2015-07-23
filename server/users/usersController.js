var url = require('url');
var utils = require('./usersUtils');
var utility = require('../utility');


module.exports = {

  attachUser: function(req, res, next, user_id) {
    console.log('attaching user_id: ', user_id);
    req.user_id = parseInt(user_id);
    next();
  },

  getUser: function(req, res, next) {
    var user_id = req.user_id;
    console.log('retrieving info for user_id:' + user_id);
    utils.retrieveUser.then(function(user) {
      if (!user) return next(new Error('user does not exist'));
      res.json(user);
    })
    .catch(function(err) {
      return next(new Error('controller error: ', err));
    });
  },

  addUser: function(req, res, next) {
    console.log('adding user: ',req.body);
    utils.storeUser(req.body).then(function(user) {
      if (!user) return next(new Error('user does not exist'));
      res.json(user);
    })
    .catch(function(err) {
      return next(new Error('controller error: ', err));
    });
  },

  updateUser: function(req, res, next) {
    var user_id = req.user_id;
    var userInfo = req.body;

    console.log('updating user_id:', user_id, ' with info: ', userInfo );
    utils.updateUser(user_id,userInfo).then(function(user) {
      if (!user) return next(new Error('user does not exist'));
      res.json(user);
    })
    .catch(function(err) {
      return next(new Error('controller error: ', err));
    });
  },

  loginUser: function(req, res, next) {
    utils.loginUser(req.body).then(function(data) {
      if (!data) return next(new Error('user does not exist'));
      utility.createSession(req, res, data);
      res.json(data);
    })
    .catch(function(error) {
      return next(new Error('controller error: ', err));
    });
  },

  logoutUser: function(req, res, next) {
    req.session.destroy(function(){
      console.log('session destroyed');
        // res.redirect('/login');
      });
    res.status(200).end();
  },

  getAllUserPlaylists: function( req, res) {
    utils.retrieveAllUserPlaylists(req.user_id)
    .then(function(playlist) {
      res.json(playlist);
    })
    .catch(function(error) {
      return next(new Error('controller error: ', err));
    });
  },

  addUserPlaylist: function( req, res) {

  }
};
