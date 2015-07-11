var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    expressSession = require('express-session'),
    helpers     = require('./helpers.js'); // our custom middleware


module.exports = function (app, express) {
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

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../www'));

  app.use('/api/users', userRouter); // use user router for all user request
  app.use('/api/rooms', roomRouter); // user link router for link request

  // authentication middleware used to decode token and made available on the request
  // app.use('/api/incidents', helpers.decode);

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  // inject our routers into their respective route files
  require('./users/usersRoutes.js')(userRouter);
  require('./rooms/roomsRoutes.js')(roomRouter);
};
