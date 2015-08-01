var React = require('react');
var Router = require('react-router');
var LandingPageContainer = require('../landingPage/landingPageContainer.jsx');
var RoomsView = require('../rooms/roomsContainer.jsx');
var RoomContainer = require('../room/roomContainer.jsx');
var Route = Router.Route;
var RouteHandler = Router.RouteHandler;
var DefaultRoute = Router.DefaultRoute;
var NotFoundRoute = Router.NotFoundRoute;

var AppModel = require('../data/models/app.js');
var app = new AppModel();

var server_uri = window.location.origin;

$.ajax({
  url: server_uri + '/api/users/loggedin',
  type: 'GET',
  success: function (res) {
    if (res) {
      app.userSignIn(res);
    }
    loadApp();
  },
  error: function (res) {
    loadApp();
  }
});

var loadApp = function() {
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

}
