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
      top: '4%'
    }
    var form;
    if (this.props.fullScreen === false) {
      form = (
        <button onClick={this.props.fullScreenClick} style={fullScreenButtonStyle} type="button">
          <span className="glyphicon glyphicon-resize-full" aria-hidden="true"></span>
        </button>
      );
    } else if (this.props.fullScreen === true) {
      form = (
        <button onClick={this.props.fullScreenClick} style={fullScreenButtonStyle} type="button">
          <span className="glyphicon glyphicon-resize-small" aria-hidden="true"></span>
        </button>
      );
    }
    //glyphicon glyphicon-resize-small
    return (
      <div style={borderStyle}>
        {form}
        <div id="videoContainer" style={style}></div>
      </div>
    );
  }
});

module.exports = VideoPlayer;
