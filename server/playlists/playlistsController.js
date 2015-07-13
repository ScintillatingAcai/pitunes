var url = require('url');
var utils = require('./playlistsUtils');
var Promise = require('bluebird');

module.exports = {

  getPlaylist: function(req, res) {
    var playlist_ID = (url.parse(req.url).pathname).slice(1);
    console.log('retrieving info for playlist_id:' + playlist_ID);
    var R = Promise.promisify(utils.retrieveUser);
    R(user_ID).then(function(user) {
      if (user) {
        res.json(user);
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
    });
  },

  addUser: function(req, res) {
    console.log('adding user: ',req.body);
    var R = Promise.promisify(utils.storeUser);
    R(req.body).then(function(data) {
      if (data) {
        res.json(data);
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
    });
  },

  updateUser: function(req, res) {
    var user_ID = (url.parse(req.url).pathname).slice(1);
    var userInfo = req.body;

    console.log('updating user_id:', user_ID, ' with info: ', userInfo );
    var R = Promise.promisify(utils.updateUser);
    R(user_ID,userInfo).then(function(user) {
      if (user) {
        res.json(user);
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
    });
  },

  loginUser: function(req, res) {
    console.log('checking user: ',req.body);
    var R = Promise.promisify(utils.loginUser);
    R(req.body).then(function(data) {
      if (data) {
        utils.createSession(req, res, data);
        res.json(data);
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      console.log('controller error: ',error);
      res.status(500).end();
    });
  },

  logoutUser: function(req, res) {
    req.session.destroy(function(){
      console.log('session destroyed');
        // res.redirect('/login');
      });
    res.status(200).end();
  }


};