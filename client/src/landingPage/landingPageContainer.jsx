var React = require('react');
var NavigationController = require('../navigation/navigationController.jsx');
var LandingPageBody = require('./landingPageBody.jsx');
var LandingPagePopularRooms = require('./landingPagePopularRooms.jsx');

var LandingPageContainer = React.createClass({
  render: function() {
    var style = {
      display: 'none',
    };
    return (
      <div>
        <div style={style}>
          <NavigationController app={this.props.app} />
        </div>
        <LandingPageBody app={this.props.app}/>
      </div>
    );
  }
});

module.exports = LandingPageContainer;
