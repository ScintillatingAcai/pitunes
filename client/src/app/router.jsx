var React = require('react');
var Router = require('react-router');
var LandingPageContainer = require('../landingPage/landingPageContainer.js');
var RoomsView = require('../rooms/roomsContainer.js');
var AppContainer = require('../roomComponents/loginController.jsx');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var AppModel = require('../data/models/app.js');
var appModel = new AppModel();

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

var LandingWrapper = React.createClass({
  render: function() {
    return ( <LandingPageContainer model={appModel} /> );
  }
});

var RoomsViewWrapper = React.createClass({
  render: function() {
    return ( <RoomsView model={appModel} /> );
  }
});

var RoomWrapper = React.createClass({
  render: function() {
    return ( <AppContainer model={appModel} /> );
  }
});

var routes = (
  <Route name='root' path="/" handler={AppRouter}>
    <DefaultRoute name='default' handler={LandingWrapper} />
     <Route name='rooms' path='rooms' handler={RoomsViewWrapper} />
    <Route name='room' path='room/:room_id' handler={RoomWrapper} />
    <NotFoundRoute name='notfound' handler={RouteNotFound} />
  </Route>
);
Router.run(routes, Router.HashLocation, (Root) => {
  React.render(<Root/>, document.getElementsByClassName('AppContainer')[0]);
});
