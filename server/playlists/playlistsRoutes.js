var usersController = require('./usersController.js');

//return all users

module.exports = function(app) {

  app.post('/signup', usersController.addUser); //add a user

  app.post('/login', usersController.loginUser); //check a user on login
  app.get('/logout', usersController.logoutUser); //logout a user

  app.get('/:user', usersController.getUser); //get one user
  app.put('/:user', usersController.updateUser); //update a user
};

