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
      res.json(user.toJSON({omitPivot: true}));
    })
    .catch(function(err) {
      return next(new Error('controller error: ', err));
    });
  },

  getSessionUser: function(req, res, next) {
    var user_id = req.session.user_id;
    console.log('retrieving info for user_id:' + user_id);

    if (user_id) {
      var user = utils.getUser(user_id);

      if ( user ) {
        res.json(user.toJSON({omitPivot: true}));
      }
    }
   
    res.end(null);      
  },

  addUser: function(req, res, next) {
    console.log('adding user: ',req.body);
    utils.storeUser(req.body).then(function(user) {
      if (!user) return next(new Error('user does not exist'));
      res.json(user.toJSON({omitPivot: true}));
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
      res.json(user.toJSON({omitPivot: true}));
    })
    .catch(function(err) {
      return next(new Error('controller error: ', err));
    });
  },

  loginUser: function(req, res, next) {
    utils.loginUser(req.body).then(function(user) {
      if (!user) return res.status(401).end('user does not exist');

      // add into memory model
      utils.addUser(user);
      // create the new cookie session
      utility.createSession(req, res, user);
    })
    .catch(function(err) {
      console.error(err);
      return res.status(401).end(err.message);
    });
  },

  logoutUser: function(req, res, next) {
    console.log("logout session user id: ", req.session.user_id);
    utils.removeUser(req.session.user_id);
    req.session.destroy(function(){
      console.log('session destroyed');
        // res.redirect('/login');
        res.status(200).end();
      });
  },

  getAllUserPlaylists: function( req, res, next ) {
    utils.retrieveAllUserPlaylists(req.user_id)
    .then(function(playlist) {
      res.json(playlist.toJSON({omitPivot: true}));
    })
    .catch(function(error) {
      return next(new Error('controller error: ', error));
    });
  },

  addUserPlaylist: function( req, res) {

  },

  setCurrentPlaylist: function(req, res, next) {
    utils.updateCurrentPlaylist(req.user_id, req.playlist_id)
    .then( function (user) {
      if (user) {
        res.end();
      } else {
        res.status(500).end();
      }
    })
    .catch(function(error) {
      return next(new Error('controller error: ', error));
    });
  },

  setLastPlaylistCurrent: function ( req, res, next) {
    utils.updateLastPlaylistCurrent(req.user_id)
    .then( function( playlist ) {
      res.json(playlist);
    });
  }
};
