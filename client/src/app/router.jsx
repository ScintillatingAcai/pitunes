var React = require('react');
var Router = require('react-router');
var LandingPageContainer = require('../landingPage/landingPageContainer.jsx');
var RoomsView = require('../rooms/roomsContainer.jsx');
var RoomContainer = require('../room/roomContainer.jsx');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var NavigationController = require('../navigation/navigationController.jsx');

var AppModel = require('../data/models/app.js');
var app = new AppModel();

var AppRouter = React.createClass({
  render: function() {
    return (
      <div>
        <NavigationController app={app}/>
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
    return ( <LandingPageContainer app={app} /> );
  }
});

var RoomsViewWrapper = React.createClass({
  render: function() {
    return ( <RoomsView app={app} /> );
  }
});

var RoomWrapper = React.createClass({
  render: function() {
    return ( <RoomContainer app={app} room_id={this.props.params.room_id}/> );
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
