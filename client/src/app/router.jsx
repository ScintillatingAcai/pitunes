var React = require('react');
var Router = require('react-router');
var LandingPageContainer = require('../landingPage/LandingPageContainer.js');
var RoomsView = require('../rooms/roomsContainer.js');
var AppContainer = require('../roomComponents/loginController.jsx');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var AppRouter = React.createClass({
  render: function() {
    return (
      <div>
        <RouteHandler/>
      </div>
    );
  }
});

var RouteNotFound = React.createClass({
  render: function () {
    return (
      <div>
        Not Found
      </div>
    );
  }
});

var routes = (
  <Route name='root' path="/" handler={AppRouter}>
    <DefaultRoute name='default' handler={LandingPageContainer} />
     <Route name='rooms' path='rooms' handler={RoomsView} />
    <Route name='room' path='room/:room_id' handler={AppContainer} />
    <NotFoundRoute name='notfound' handler={RouteNotFound} />
  </Route>
);
Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementsByClassName('AppContainer')[0]);
});
