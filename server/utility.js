exports.isLoggedIn = function(req, res) {
  return req.session ? !! req.session.userId : false;
};

exports.checkUser = function(req, res, next) {
  if (!exports.isLoggedIn(req)) {
    res.redirect('#/');
  } else {
    next();
  }
};

exports.createSession = function(req, res, newUser) {
  req.session.regenerate(function(err) {
  });
  req.session.userId = newUser.id;
};

