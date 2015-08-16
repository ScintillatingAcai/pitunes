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
      height: this.props.playerHeight,
      bottom: "0",
      backgroundColor: '#222',
      overflow: 'hidden'
    };
    var fullScreenButtonStyle = {
      position: 'absolute',
      color: 'white',
      backgroundColor: 'black',
      border: 'none',
      right: '3%',
      top: '4%',
      outline: 'none'
    }
    var muteButtonStyle = {
      position: 'absolute',
      color: 'white',
      backgroundColor: 'black',
      border: 'none',
      right: '3%',
      top: '8%',
      outline: 'none'
    };
    var fullScreenForm;
    if (this.props.fullScreen === false) {
      fullScreenForm = (
        <button onClick={this.props.fullScreenClick} style={fullScreenButtonStyle} type="button">
          <span className="glyphicon glyphicon-resize-full" aria-hidden="true"></span>
        </button>
      );
    } else if (this.props.fullScreen === true) {
      fullScreenForm = (
        <button onClick={this.props.fullScreenClick} style={fullScreenButtonStyle} type="button">
          <span className="glyphicon glyphicon-resize-small" aria-hidden="true"></span>
        </button>
      );
    }
    var muteButtonForm;
    if (this.props.mute === false) {
      muteButtonForm = (
        <button onClick={this.props.muteClick} style={muteButtonStyle} type="button">
          <span className="glyphicon glyphicon-volume-up" aria-hidden="true"></span>
        </button>
      );
    } else if (this.props.mute === true) {
      muteButtonForm = (
        <button onClick={this.props.muteClick} style={muteButtonStyle} type="button">
          <span className="glyphicon glyphicon-volume-off" aria-hidden="true"></span>
        </button>
      );
    }
    //glyphicon glyphicon-resize-small
    return (
      <div style={borderStyle}>
        {fullScreenForm}
        {muteButtonForm}
        <div id="videoContainer" style={style}></div>
      </div>
    );
  }
});

module.exports = VideoPlayer;
