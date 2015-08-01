var React = require('react');

var VideoPlayer = React.createClass({
  componentDidMount: function () {
    serveStaticImg();
  },
  componentWillUnmount: function () {
    removeVideo();
  },
  render: function() {
    var style = {
      width: "100%",
      height: "50%",
      bottom: "0",
      border: '1px solid #333',
      backgroundColor: '#000'
      // pointerEvents: 'none'
    };
    return (
      <div id="videoContainer" style={style}></div>
    );
  }
});

module.exports = VideoPlayer;