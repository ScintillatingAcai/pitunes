var React = require('react');

var LandingPageBody = require('./landingPageBody.jsx');
var LandingPagePopularRooms = require('./landingPagePopularRooms.jsx');

var LandingPageContainer = React.createClass({
  render: function() {
    return (
      <div>
        <LandingPageBody />
        <LandingPagePopularRooms />
      </div>
    );
  }
});

module.exports = LandingPageContainer;
