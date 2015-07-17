var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    expressSession = require('express-session'),
    // helpers     = require('./helpers.js'); // our custom middleware
    utility     = require('./utility'); // our custom middleware


module.exports = function (app, express, io) {
  // Express 4 allows us to use multiple routers with their own configurations
  var session = { path: '/',
                httpOnly: true,
                secure: false,
                secret: 'share me!',
                cookie: {maxAge: 1000 * 60 * 60 * 24, secure: false},
                maxAge: 1000 * 60 * 60 * 24,
                resave: false,
                saveUninitialized: true
              };
  app.use(expressSession(session));
  var userRouter = express.Router();
  var roomRouter = express.Router();
  var playlistRouter = express.Router();
  var mediaRouter = express.Router();

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../client'));

  app.use('/api/users', userRouter); // use user router for all user request
  app.use('/api/rooms', roomRouter); // use room router for room request
  app.use('/api/playlists', playlistRouter); // use playlist router for playlist request
  app.use('/api/medias', mediaRouter); // use playlist router for playlist request

  // authentication middleware used to decode token and made available on the request
  // app.use('/api/incidents', helpers.decode);

  app.use(utility.errorLogger);
  app.use(utility.errorHandler);

  // inject our routers into their respective route files
  require('./users/usersRoutes.js')(userRouter);
  require('./rooms/roomsRoutes.js')(roomRouter);
  require('./playlists/playlistsRoutes.js')(playlistRouter);
  require('./medias/mediasRoutes.js')(mediaRouter);

  var mediaTimer = setInterval(function(){

  },3000);

  require('./socket.js')(io);

};
