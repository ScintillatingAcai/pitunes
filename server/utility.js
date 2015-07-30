exports.isLoggedIn = function(req, res) {
  return req.session ? !!req.session.user_id : false;
};

exports.checkUserSession = function(req, res, next) {
    console.log('checking session');
  if ( req.user_id && (req.user_id !== req.session.user_id)) {
    console.error('req user_id: ', req.user_id);
    console.error('session user_id: ', req.session.user_id);

    res.status(401).end("User not logged in");
  }
  else if (!exports.isLoggedIn(req)) {
    // res.redirect('#/');
    console.error("User not logged in");
    res.status(401).end("User not logged in");
  }
  else {
    next();
  }
};

exports.createSession = function(req, res, newUser) {
  req.session.regenerate(function(err) { //XXX check if this is async, currently programmed as sync
    if (err) return console.error(err);
    // res.redirect('/');
    req.session.user_id = newUser.id;
    res.json(newUser.toJSON({omitPivot: true}));

  });
};

exports.errorLogger = function (error, req, res, next) {
  // log the error then send it to the next middleware in
  // middleware.js

  console.error(error.stack);
  next(error);
};

exports.errorHandler = function (error, req, res, next) {
  // send error message to client
  // message for gracefull error handling on app
  res.status(500).send({error: error.message});
};

