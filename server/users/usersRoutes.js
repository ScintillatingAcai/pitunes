var usersController = require('./usersController.js');
var utility = require('../utility');
//return all users

module.exports = function(app) {

  app.post('/signup', usersController.addUser); //add a user

  app.post('/login', usersController.loginUser); //login a user
  app.get('/logout', usersController.logoutUser); //logout a user

  app.get('/:user', utility.checkUserSession, usersController.getUser); //get one user
  app.put('/:user', utility.checkUserSession, usersController.updateUser); //update a user
};

