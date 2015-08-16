var React = require('react');

var VideoPlayer = require('./video/player.jsx');
var Chat = require('./chat/chat.jsx');

var playerHeight = '60%';
var centerContainerLeft = '20%';
var centerContainerWidth = '60%';

var CenterContainer = React.createClass({
  getInitialState: function() {
    return { fullScreen: false, mute: false };
  },
  fullScreenClick: function() {
    if (this.state.fullScreen === false) {
      playerHeight = '100%';
      centerContainerLeft = '0';
      centerContainerWidth = '100%';
      this.setState({ fullScreen: true });
    } else if (this.state.fullScreen === true) {
      playerHeight = '60%';
      centerContainerLeft = '20%';
      centerContainerWidth = '60%';
      this.setState({ fullScreen: false });
    }
  },
  muteClick: function() {
    if (player) {
      if (this.state.mute === false) {
        player.mute()
        this.setState({ mute: true });
      } else if (this.state.mute === true) {
        player.unMute();
        this.setState({ mute: false });
      }
    }
  },
  render: function() {
    var centerContainerStyle = {
      position: 'absolute',
      left: centerContainerLeft,
      width: centerContainerWidth,
      margin: '0px 0px 0px 0px',
      backgroundColor: '#222',
      top: '50px',
      bottom: '0px',
      zIndex: '1'
    };
    return (
      <div style={centerContainerStyle}>
        <VideoPlayer mute={this.state.mute} muteClick={this.muteClick} playerHeight={playerHeight} fullScreenClick={this.fullScreenClick} fullScreen={this.state.fullScreen}/>
        <Chat app={this.props.app}/>
      </div>
    );
  }
});

module.exports = CenterContainer;