var React = require('react');
var NavigationController = require('../navigation/navigationController.jsx');
var LandingPageBody = require('./landingPageBody.jsx');
var LandingPagePopularRooms = require('./landingPagePopularRooms.jsx');

var LandingPageContainer = React.createClass({
  render: function() {
    return (
      <div>
        <NavigationController app={this.props.app}/>
        <LandingPageBody app={this.props.app}/>
        <LandingPagePopularRooms />
      </div>
    );
  }
});

module.exports = LandingPageContainer;
