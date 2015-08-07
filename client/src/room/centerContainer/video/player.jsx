var React = require('react');

var VideoPlayer = React.createClass({
  componentDidMount: function () {
    serveStaticImg();
  },
  componentWillUnmount: function () {
    removeVideo();
  },
  render: function () {
    var style = {
      width: "100%",
      height: "100%",
    };
    var borderStyle = {
      border: '10px solid #222222',
      borderRadius: '40px',
      width: "100%",
      height: "60%",
      bottom: "0",
      backgroundColor: '#222',
      overflow: 'hidden'
    };
    return (
      <div style={borderStyle}>
      <div id="videoContainer" style={style}></div>
      </div>
    );
  }
});

module.exports = VideoPlayer;
