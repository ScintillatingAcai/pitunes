var React = require('react');

var LandingPagePopularRooms = React.createClass({
  componentDidMount: function () {
    $.get(window.location.origin + '/api/rooms?top=3', function (res) {
      res.forEach(function (room) {

      });
    });
  },
  render: function () {
    var imageSource;
    return (
      <div className="content-section-a">
        <div className="container">
          <div className="row">

          </div>
        </div>
      </div>
    );
  }
});

module.exports = LandingPagePopularRooms;